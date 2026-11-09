import { z } from "zod";

export type ValidationMessages = {
  parentName: string;
  email: string;
  phone: string;
  studentName: string;
  grade: string;
  date: string;
  time: string;
  message: string;
  consent: string;
  tooLong: string;
};

const defaultMessages: ValidationMessages = {
  parentName: "Please enter the parent or guardian name.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid phone number.",
  studentName: "This name is too long.",
  grade: "Please select a grade or choose 'Not sure yet'.",
  date: "Please choose a valid future date.",
  time: "Please choose a preferred time.",
  message: "Please keep your message under 2000 characters.",
  consent: "Please confirm that we may contact you about this visit.",
  tooLong: "This value is too long.",
};

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .or(z.literal(""));

export function createVisitRequestSchema(
  messages: ValidationMessages = defaultMessages,
) {
  return z.object({
    parentName: z
      .string()
      .trim()
      .min(2, messages.parentName)
      .max(120, messages.tooLong),
    email: z
      .string()
      .trim()
      .min(1, messages.email)
      .max(180, messages.email)
      .email(messages.email),
    phone: z
      .string()
      .trim()
      .min(7, messages.phone)
      .max(30, messages.phone)
      .regex(/^[+()\d\s.\-]+$/, messages.phone),
    studentName: optionalText(120, messages.studentName),
    grade: optionalText(60, messages.grade),
    preferredDate: optionalText(10, messages.date).refine(
      (value) => {
        if (!value) return true;
        const selected = new Date(`${value}T12:00:00`);
        if (Number.isNaN(selected.getTime())) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const oneYear = new Date(today);
        oneYear.setFullYear(oneYear.getFullYear() + 1);
        return selected >= today && selected <= oneYear;
      },
      { message: messages.date },
    ),
    preferredTime: optionalText(40, messages.time),
    message: z
      .string()
      .trim()
      .max(2000, messages.message)
      .optional()
      .or(z.literal("")),
    consent: z.boolean().refine((value) => value === true, {
      message: messages.consent,
    }),
    /** Hidden anti-spam field: real visitors leave it empty. */
    companyWebsite: z.string().max(200, messages.tooLong).optional(),
    /** Hidden timestamp used for a minimum completion time check. */
    formStartedAt: z.number().int().positive().optional(),
  });
}

export const visitRequestSchema = createVisitRequestSchema();

export type VisitRequestInput = z.infer<typeof visitRequestSchema>;

export const visitStatuses = [
  "NEW",
  "CONTACTED",
  "SCHEDULED",
  "COMPLETED",
  "CANCELLED",
] as const;
