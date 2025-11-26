import nodemailer from "nodemailer";

let transporter;

// Crear el transporter una sola vez (para no recrearlo en cada llamada)
function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true si usas puerto 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    return transporter;
}

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

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
        const captchaRes = await fetch(verifyUrl, { method: "POST" });
        const captchaJson = await captchaRes.json();

        if (!captchaJson.success) {
            return res.status(400).json({ error: "CAPTCHA verification failed" });
        }

        // 2) Honeypot
        if (company) {
            return res.status(400).json({ error: "Spam detected" });
        }

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const safe = (str = "") =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        const fromName = process.env.MAIL_FROM_NAME || "XILO Contact";
        const to = process.env.CONTACT_TO || process.env.SMTP_USER;

        const mailOptions = {
            from: `"${fromName}" <${process.env.SMTP_USER}>`,
            to,
            subject: `Nuevo contacto: ${safe(name)}`,
            replyTo: email,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${safe(name)}</p>
        <p><b>Email:</b> ${safe(email)}</p>
        <p><b>Mensaje:</b><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
      `,
        };

        const transport = getTransporter();
        await transport.sendMail(mailOptions);

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Mail send failed:", err);
        return res.status(500).json({
            error: "Mail send failed",
            detail: err?.message || "Unknown error",
        });
    }
}
