// api/contact.js
import { Resend } from "resend";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, message, company } = req.body || {};

        // Honeypot: si viene relleno => bot
        if (company) {
            return res.status(400).json({ error: "Spam detected" });
        }

        // Validación básica
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Sanitizar (muy básico)
        const safe = (str = "") =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: process.env.MAIL_FROM || "Contact <no-reply@yourdomain.com>",
            to: process.env.CONTACT_TO, // tu email destino
            subject: `Nuevo contacto: ${name}`,
            reply_to: email,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${safe(name)}</p>
        <p><b>Email:</b> ${safe(email)}</p>
        <p><b>Mensaje:</b><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
      `
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Mail send failed:", err);
        return res.status(500).json({ error: "Mail send failed" });
    }
}
