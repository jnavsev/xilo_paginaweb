import { Resend } from "resend";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, message, company, captcha } = req.body || {};

        // ENV obligatorias
        const {
            RECAPTCHA_SECRET_KEY,
            RESEND_API_KEY,
            MAIL_FROM,
            CONTACT_TO,
        } = process.env;

        if (!RECAPTCHA_SECRET_KEY || !RESEND_API_KEY || !MAIL_FROM || !CONTACT_TO) {
            console.error("Missing required environment variables");
            return res.status(500).json({
                error: "Server configuration error: missing environment variables",
            });
        }

        // Validación CAPTCHA
        if (!captcha) {
            return res.status(400).json({ error: "Missing captcha token" });
        }

        const verifyUrl =
            `https://www.google.com/recaptcha/api/siteverify` +
            `?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`;

        const captchaRes = await fetch(verifyUrl, { method: "POST" });
        const captchaJson = await captchaRes.json();

        if (!captchaJson.success) {
            console.error("Captcha error:", captchaJson);
            return res.status(400).json({ error: "CAPTCHA verification failed" });
        }

        // Honeypot
        if (company) {
            return res.status(400).json({ error: "Spam detected" });
        }

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Sanitizado seguro
        const safe = (str = "") =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        // Instancia Resend
        const resend = new Resend(RESEND_API_KEY);

        // Enviar email
        const { data, error } = await resend.emails.send({
            from: MAIL_FROM,
            to: CONTACT_TO, // <- 100% variable de entorno
            subject: `Nuevo contacto: ${safe(name)}`,
            reply_to: email,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${safe(name)}</p>
        <p><b>Email:</b> ${safe(email)}</p>
        <p><b>Mensaje:</b><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
      `,
        });

        if (error) {
            console.error("Resend API error:", error);
            return res.status(500).json({ error: "Mail send failed" });
        }

        console.log("Mail sent OK:", data?.id);
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Mail send failed (exception):", err);
        return res.status(500).json({ error: "Mail send failed" });
    }
}
