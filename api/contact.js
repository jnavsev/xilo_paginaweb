import { Resend } from "resend";


export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, message, company, captcha } = req.body || {};

        // 1) CAPTCHA
        if (!captcha) {
            return res.status(400).json({ error: "Missing captcha token" });
        }
        // eslint-disable-next-line no-undef
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
        const captchaRes = await fetch(verifyUrl, { method: "POST" });
        const captchaJson = await captchaRes.json();

        if (!captchaJson.success) {
            return res.status(400).json({ error: "CAPTCHA verification failed" });
        }

        // 2) Honeypot (campo oculto en el formulario)
        if (company) {
            return res.status(400).json({ error: "Spam detected" });
        }

        // 3) Validación básica
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // 4) Sanitizado muy básico de HTML
        const safe = (str = "") =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        // eslint-disable-next-line no-undef
        const resend = new Resend(process.env.RESEND_API_KEY);

        // 5) Envío del correo
        await resend.emails.send({
            // eslint-disable-next-line no-undef
            from: process.env.MAIL_FROM || "XILO Contact <contact@xilo-biometrics.com>",
            // eslint-disable-next-line no-undef
            to: process.env.CONTACT_TO || "info@xilo-biometrics.com",
            subject: `Nuevo contacto: ${safe(name)}`,
            reply_to: email,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${safe(name)}</p>
        <p><b>Email:</b> ${safe(email)}</p>
        <p><b>Mensaje:</b><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
      `,
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Mail send failed:", err);
        return res.status(500).json({ error: "Mail send failed" });
    }
}
