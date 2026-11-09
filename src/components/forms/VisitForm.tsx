"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  createVisitRequestSchema,
  type ValidationMessages,
  type VisitRequestInput,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; code: string };

const inputClass =
  "mt-2 w-full border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-teal focus:ring-2 focus:ring-teal/15";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function VisitForm() {
  const t = useTranslations("Form");
  const statusValues = useTranslations("Common");
  const [submitStatus, setSubmitStatus] = useState<Status>({ state: "idle" });
  const [formStartedAt] = useState(() => Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);
  const maxDate = useMemo(() => {
    const value = new Date(today);
    value.setFullYear(value.getFullYear() + 1);
    return value;
  }, [today]);

  const messages: ValidationMessages = useMemo(
    () => ({
      parentName: t("errors.parentName"),
      email: t("errors.email"),
      phone: t("errors.phone"),
      studentName: t("errors.studentName"),
      grade: t("errors.grade"),
      date: t("errors.preferredDate"),
      time: t("errors.preferredTime"),
      message: t("errors.message"),
      consent: t("errors.consent"),
      tooLong: t("errors.tooLong"),
    }),
    [t],
  );

  const schema = useMemo(() => createVisitRequestSchema(messages), [messages]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VisitRequestInput>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      studentName: "",
      grade: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
      consent: false,
      companyWebsite: "",
    },
  });

  useEffect(() => {
    if (submitStatus.state === "success") {
      successRef.current?.focus();
    }
  }, [submitStatus.state]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formStartedAt,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string }
        | null;

      if (response.ok && result?.ok) {
        setSubmitStatus({ state: "success" });
        reset();
        return;
      }

      setSubmitStatus({ state: "error", code: result?.code ?? "unknown" });
    } catch {
      setSubmitStatus({ state: "error", code: "network" });
    }
  });

  if (submitStatus.state === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[26rem] flex-col items-start justify-center border border-teal/25 bg-white p-8 outline-none sm:p-12"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-teal/10 text-teal-deep">
          <CheckCircle2
            aria-hidden="true"
            className="size-7"
            strokeWidth={1.6}
          />
        </span>
        <h2 className="mt-7 font-display text-3xl leading-tight text-navy">
          {t("successTitle")}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus({ state: "idle" })}
          className="mt-8 inline-flex min-h-11 items-center rounded-full border border-navy/20 px-6 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
        >
          {t("successAgain")}
        </button>
      </div>
    );
  }

  const errorMessage = (() => {
    if (submitStatus.state !== "error") return null;
    switch (submitStatus.code) {
      case "duplicate":
        return t("errorDuplicate");
      case "rate_limited":
        return t("errorRate");
      case "unavailable":
      case "network":
      case "unknown":
        return t("errorUnavailable");
      case "spam":
        return t("errorSpam");
      case "validation":
        return t("errorValidation");
      default:
        return t("errorBody");
    }
  })();

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="border border-navy/10 bg-white p-6 sm:p-9 lg:p-11"
    >
      <div className="border-b border-navy/10 pb-7">
        <p className="eyebrow text-teal-deep">{statusValues("bookVisit")}</p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-navy sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          {t("intro")}
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0"
            strokeWidth={1.8}
          />
          <div>
            <p className="font-semibold">{t("errorTitle")}</p>
            <p className="mt-1 text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="parentName"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.parentName.label")} *
          </label>
          <input
            id="parentName"
            type="text"
            autoComplete="name"
            placeholder={t("fields.parentName.placeholder")}
            aria-invalid={Boolean(errors.parentName)}
            aria-describedby={errors.parentName ? "parentName-error" : undefined}
            className={cn(inputClass, errors.parentName && "border-red-400")}
            {...register("parentName")}
          />
          {errors.parentName && (
            <p
              id="parentName-error"
              className="mt-1.5 text-xs text-red-700"
            >
              {errors.parentName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.email.label")} *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t("fields.email.placeholder")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-red-400")}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.phone.label")} *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={t("fields.phone.placeholder")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClass, errors.phone && "border-red-400")}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-700">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="studentName"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.studentName.label")}
            <span className="ml-2 font-normal normal-case tracking-normal text-navy/40">
              {t("optional")}
            </span>
          </label>
          <input
            id="studentName"
            type="text"
            autoComplete="off"
            placeholder={t("fields.studentName.placeholder")}
            aria-invalid={Boolean(errors.studentName)}
            className={cn(inputClass, errors.studentName && "border-red-400")}
            {...register("studentName")}
          />
          {errors.studentName && (
            <p className="mt-1.5 text-xs text-red-700">
              {errors.studentName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="grade"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.grade.label")}
            <span className="ml-2 font-normal normal-case tracking-normal text-navy/40">
              {t("optional")}
            </span>
          </label>
          <select
            id="grade"
            className={cn(inputClass, "appearance-none")}
            aria-invalid={Boolean(errors.grade)}
            {...register("grade")}
          >
            <option value="">{t("fields.grade.placeholder")}</option>
            <option value="early-years">{t("gradeOptions.earlyYears")}</option>
            <option value="elementary">{t("gradeOptions.elementary")}</option>
            <option value="middle-school">
              {t("gradeOptions.middleSchool")}
            </option>
            <option value="high-school">{t("gradeOptions.highSchool")}</option>
            <option value="not-sure">{t("gradeOptions.notSure")}</option>
          </select>
          {errors.grade && (
            <p className="mt-1.5 text-xs text-red-700">
              {errors.grade.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="preferredDate"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.preferredDate.label")}
            <span className="ml-2 font-normal normal-case tracking-normal text-navy/40">
              {t("optional")}
            </span>
          </label>
          <input
            id="preferredDate"
            type="date"
            min={toDateInputValue(today)}
            max={toDateInputValue(maxDate)}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={
              errors.preferredDate ? "preferredDate-error" : "preferredDate-hint"
            }
            className={cn(
              inputClass,
              errors.preferredDate && "border-red-400",
            )}
            {...register("preferredDate")}
          />
          <p
            id="preferredDate-hint"
            className="mt-1.5 text-[0.68rem] text-navy/40"
          >
            {t("preferredDateHint")}
          </p>
          {errors.preferredDate && (
            <p
              id="preferredDate-error"
              className="mt-1.5 text-xs text-red-700"
            >
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="preferredTime"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.preferredTime.label")}
            <span className="ml-2 font-normal normal-case tracking-normal text-navy/40">
              {t("optional")}
            </span>
          </label>
          <select
            id="preferredTime"
            className={cn(inputClass, "appearance-none")}
            aria-invalid={Boolean(errors.preferredTime)}
            {...register("preferredTime")}
          >
            <option value="">{t("fields.preferredTime.placeholder")}</option>
            <option value="morning">{t("timeOptions.morning")}</option>
            <option value="midday">{t("timeOptions.midday")}</option>
            <option value="afternoon">{t("timeOptions.afternoon")}</option>
            <option value="no-preference">
              {t("timeOptions.noPreference")}
            </option>
          </select>
          {errors.preferredTime && (
            <p className="mt-1.5 text-xs text-red-700">
              {errors.preferredTime.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy"
          >
            {t("fields.message.label")}
            <span className="ml-2 font-normal normal-case tracking-normal text-navy/40">
              {t("optional")}
            </span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder={t("fields.message.placeholder")}
            aria-invalid={Boolean(errors.message)}
            className={cn(
              inputClass,
              "resize-y",
              errors.message && "border-red-400",
            )}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-700">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from assistive technology and real visitors. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="companyWebsite">{t("honeypotLabel")}</label>
        <input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div className="mt-7 border-t border-navy/10 pt-6">
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft"
        >
          <input
            id="consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-teal"
            {...register("consent")}
          />
          <span>
            {t("consent")} <span aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-xs text-red-700">
            {errors.consent.message}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={submitStatus.state === "submitting"}
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-gold-soft disabled:cursor-wait disabled:opacity-60"
          >
            {submitStatus.state === "submitting" ? t("submitting") : t("submit")}
            <Send
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </button>
          <p className="text-[0.68rem] leading-relaxed text-navy/45">
            {t("privacyNote")}
          </p>
        </div>
        <p className="mt-3 text-[0.62rem] text-navy/35">{t("requiredNote")}</p>
      </div>
    </form>
  );
}
