import React, { useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_CONTACT_API || "/api/contact";
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function ContactPage() {
    const { t } = useTranslation("contact");
    const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false); // 👈 modal de éxito
    const captchaRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        if (!captchaToken) {
            alert("Por favor, completa el reCAPTCHA.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    message: form.message.trim(),
                    company: form.company, // honeypot
                    captcha: captchaToken,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                console.error("Error en /api/contact:", res.status, data);
                throw new Error(data?.error || "Bad response");
            }

            // ✅ Envío OK → limpiamos y abrimos modal
            setForm({ name: "", email: "", message: "", company: "" });
            captchaRef.current?.reset();
            setCaptchaToken(null);
            setShowSuccess(true);
        } catch (err) {
            console.error("Error al enviar contacto:", err);
            alert(t("alerts.error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="contact-page">
            <div className="wave-top-contact" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,40 C240,100 480,100 720,60 C960,20 1200,20 1440,60 L1440,0 L0,0 Z" />
                </svg>
            </div>

            <section className="contact-header">
                <h1>{t("title")}</h1>
                <p className="subtitle">{t("subtitle")}</p>
            </section>

            <section className="contact-grid container-contact">
                <div className="contact-illustration">
                    <img
                        src="/assets/contact/contact_page.png"
                        alt={t("imageAlt")}
                        loading="lazy"
                    />
                </div>

                <div className="contact-card">
                    <div className="card-head">
                        <p>
                            <Trans i18nKey="contact:lead">
                                Rellena el <strong>siguiente formulario</strong> si estás interesado en
                                contactar con nosotros.
                            </Trans>
                        </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {/* Honeypot oculto */}
                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            autoComplete="off"
                            tabIndex="-1"
                            style={{ display: "none" }}
                            aria-hidden="true"
                        />

                        <label htmlFor="name">{t("form.name.label")}</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={t("form.name.placeholder")}
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">{t("form.email.label")}</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t("form.email.placeholder")}
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="message">{t("form.message.label")}</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            placeholder={t("form.message.placeholder")}
                            value={form.message}
                            onChange={handleChange}
                            required
                        />

                        {/* reCAPTCHA */}
                        <div className="recaptcha-wrapper" style={{ margin: "1.5rem 0" }}>
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey={SITE_KEY}
                                onChange={(token) => setCaptchaToken(token)}
                                theme="light"
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading
                                ? t("form.sending", { defaultValue: "Enviando..." })
                                : t("form.submit")}
                        </button>
                    </form>
                </div>
            </section>

            <div className="wave-bottom-contact" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 C240,20 480,20 720,60 C960,100 1200,100 1440,60 L1440,120 L0,120 Z" />
                </svg>
            </div>

            {/* 🟣 MODAL DE ÉXITO */}
            {showSuccess && (
                <div
                    className="contact-modal-backdrop"
                    onClick={() => setShowSuccess(false)} // cerrar al hacer click fuera
                >
                    <div
                        className="contact-modal"
                        onClick={(e) => e.stopPropagation()} // evitar cerrar al hacer click dentro
                    >
                        <div className="contact-modal-left">
                            <img
                                src="/assets/contact/success.png" // pon aquí tu dibujo/ilustración
                                alt="Mensaje enviado correctamente"
                                loading="lazy"
                            />
                        </div>
                        <div className="contact-modal-right">
                            <h2>Mensaje enviado</h2>
                            <p>
                                Hemos recibido tu mensaje correctamente.
                                Te responderemos en breves.
                            </p>

                            <button
                                type="button"
                                className="btn-primary"
                                style={{ marginTop: "1rem" }}
                                onClick={() => setShowSuccess(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
