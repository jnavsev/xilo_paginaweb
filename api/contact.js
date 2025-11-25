import { Resend } from "resend";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, message, company, captcha } = req.body || {};

        // Extra: log de entrada
        console.log("➡️ Incoming request:", { name, email, message, company, captcha: !!captcha });

        const {
            RECAPTCHA_SECRET_KEY,
            RESEND_API_KEY,
            MAIL_FROM,
            CONTACT_TO,
        } = process.env;

        // LOG de todas las variables
        console.log("🔧 ENV VARIABLES LOADED:", {
            RECAPTCHA_SECRET_KEY: !!RECAPTCHA_SECRET_KEY,
            RESEND_API_KEY: !!RESEND_API_KEY,
            MAIL_FROM,
            CONTACT_TO,
        });

        // Validar env vars
        const missingVars = [];
        if (!RECAPTCHA_SECRET_KEY) missingVars.push("RECAPTCHA_SECRET_KEY");
        if (!RESEND_API_KEY) missingVars.push("RESEND_API_KEY");
        if (!MAIL_FROM) missingVars.push("MAIL_FROM");
        if (!CONTACT_TO) missingVars.push("CONTACT_TO");

        if (missingVars.length > 0) {
            console.error("❌ Missing environment variables:", missingVars);
            return res.status(500).json({
                error: "Server configuration error",
                missing: missingVars,
            });
        }

        // Validación CAPTCHA
        if (!captcha) {
            return res.status(400).json({ error: "Missing captcha token" });
        }

        const verifyUrl =
            `https://www.google.com/recaptcha/api/siteverify` +
            `?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`;

        console.log("➡️ Sending CAPTCHA verification request");
        const captchaRes = await fetch(verifyUrl, { method: "POST" });

        console.log("🔍 CAPTCHA STATUS:", captchaRes.status);

        const captchaJson = await captchaRes.json();
        console.log("🔍 CAPTCHA RESPONSE:", captchaJson);

        if (!captchaJson.success) {
            console.error("❌ CAPTCHA FAILED:", captchaJson);
            return res.status(400).json({ error: "CAPTCHA verification failed", details: captchaJson });
        }

        // Honeypot
        if (company) {
            console.warn("⚠️ Honeypot triggered");
            return res.status(400).json({ error: "Spam detected" });
        }

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Sanitizado
        const safe = (str = "") =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        console.log("➡️ Creating Resend instance");
        const resend = new Resend(RESEND_API_KEY);

        console.log("➡️ Sending email via Resend");
        const { data, error } = await resend.emails.send({
            from: MAIL_FROM,
            to: CONTACT_TO,
            subject: `Nuevo contacto: ${safe(name)}`,
            reply_to: email,
            html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${safe(name)}</p>
        <p><b>Email:</b> ${safe(email)}</p>
        <p><b>Mensaje:</b><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
      `,
        });

        console.log("🔍 RESEND RESPONSE:", { data, error });

        if (error) {
            console.error("❌ RESEND API ERROR:", error);

            return res.status(500).json({
                error: "Mail send failed",
                resendError: error,
            });
        }

        console.log("✅ Mail sent successfully:", data?.id);
        return res.status(200).json({ ok: true, id: data?.id });

    } catch (err) {
        console.error("🔥 Unhandled exception:", err);

        return res.status(500).json({
            error: "Unhandled server error",
            details: err.toString(),
        });
    }
}
