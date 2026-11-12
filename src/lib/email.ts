import "server-only";

import nodemailer from "nodemailer";

export type VisitNotificationData = {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  studentName?: string | null | undefined;
  grade?: string | null | undefined;
  preferredDate?: string | null | undefined;
  preferredTime?: string | null | undefined;
  message?: string | null | undefined;
  createdAt: Date;
};

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function recipient() {
  return (
    process.env.ADMISSIONS_NOTIFY_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_ADMISSIONS_EMAIL?.trim() ||
    ""
  );
}

function formatDate(value: string | null | undefined) {
  if (!value) return "No especificada";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-BO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function sendVisitRequestNotification(data: VisitNotificationData) {
  const transporter = getTransporter();
  const to = recipient();

  if (!transporter) {
    console.log("[email] SMTP no configurado, se omite notificación por correo");
    return { ok: false, reason: "not_configured" };
  }

  if (!to) {
    console.log(
      "[email] No hay destinatario configurado, se omite notificación por correo",
    );
    return { ok: false, reason: "no_recipient" };
  }

  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const student = data.studentName ? data.studentName : "No indicado";
  const grade = data.grade ? data.grade : "No indicado";
  const time = data.preferredTime ? data.preferredTime : "Sin preferencia";
  const message = data.message ? data.message : "Sin mensaje adicional";

  const subject = `Nueva solicitud de visita al campus — ${data.parentName}`;

  const text = `
Nueva solicitud de visita al campus de JOLA School.

Datos del solicitante:
- Nombre: ${data.parentName}
- Correo: ${data.email}
- Teléfono: ${data.phone}
- Estudiante: ${student}
- Grado de interés: ${grade}
- Fecha preferida: ${formatDate(data.preferredDate)}
- Horario preferido: ${time}
- Mensaje adicional: ${message}

ID de solicitud: ${data.id}
Fecha de recepción: ${data.createdAt.toLocaleString("es-BO")}

Responda a este correo o contacte directamente a la familia usando los datos anteriores.
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.6; color: #1f2937;">
    <div style="max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #0f3d5e;">Nueva solicitud de visita al campus — JOLA School</h2>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e; width: 35%;">Nombre:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${data.parentName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e;">Correo:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e;">Teléfono:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e;">Estudiante:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${student}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e;">Grado de interés:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${grade}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e;">Fecha preferida:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${formatDate(data.preferredDate)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #0f3d5e;">Horario preferido:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${time}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #0f3d5e;">Mensaje adicional:</td>
          <td style="padding: 8px 0;">${message}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
        ID de solicitud: <strong>${data.id}</strong><br />
        Fecha de recepción: <strong>${data.createdAt.toLocaleString("es-BO")}</strong>
      </p>

      <p style="margin-top: 16px; font-size: 14px; color: #6b7280;">
        Responda a este correo o contacte directamente a la familia usando los datos anteriores.
      </p>
    </div>
  </body>
</html>
  `.trim();

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log(`[email] Notificación enviada a ${to} (solicitud ${data.id})`);
    return { ok: true };
  } catch (error) {
    console.error("[email] Error al enviar notificación:", error);
    return { ok: false, reason: "send_failed" };
  }
}
