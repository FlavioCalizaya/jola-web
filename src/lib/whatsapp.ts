import "server-only";

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

const API_VERSION = "v21.0";

function config() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const to = process.env.WHATSAPP_TO?.trim();
  return { token, phoneNumberId, to };
}

function formatDate(value: string | null | undefined) {
  if (!value) return "No especificada";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-BO", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function buildMessage(data: VisitNotificationData): string {
  const student = data.studentName ? data.studentName : "No indicado";
  const grade = data.grade ? data.grade : "No indicado";
  const time = data.preferredTime ? data.preferredTime : "Sin preferencia";
  const message = data.message ? data.message : "Sin mensaje adicional";

  return [
    `🏫 *Nueva solicitud de visita — JOLA School*`,
    ``,
    `*Nombre:* ${data.parentName}`,
    `*Correo:* ${data.email}`,
    `*Teléfono:* ${data.phone}`,
    `*Estudiante:* ${student}`,
    `*Grado:* ${grade}`,
    `*Fecha preferida:* ${formatDate(data.preferredDate)}`,
    `*Horario:* ${time}`,
    `*Mensaje:* ${message}`,
    ``,
    `ID: ${data.id}`,
    `Recibido: ${data.createdAt.toLocaleString("es-BO")}`,
  ].join("\n");
}

export async function sendVisitRequestWhatsApp(data: VisitNotificationData) {
  const { token, phoneNumberId, to } = config();

  if (!token || !phoneNumberId || !to) {
    console.log(
      "[whatsapp] Credenciales no configuradas, se omite notificación por WhatsApp",
    );
    return { ok: false, reason: "not_configured" };
  }

  const body = buildMessage(data);
  const url = `https://graph.facebook.com/${API_VERSION}/${phoneNumberId}/messages`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[whatsapp] Error de API (${response.status}): ${errorText}`,
      );
      return { ok: false, reason: "api_error", status: response.status };
    }

    const result = await response.json();
    console.log(`[whatsapp] Notificación enviada a ${to} (solicitud ${data.id})`);
    return { ok: true, data: result };
  } catch (error) {
    console.error("[whatsapp] Error al enviar notificación:", error);
    return { ok: false, reason: "send_failed" };
  }
}
