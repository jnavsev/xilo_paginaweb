import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
    const { t } = useTranslation("contactSection");

    return (
        <section className="contact-wrap" id="contact">
            {/* Ola superior (blanco → color) */}
            <div className="wave-top-contact" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,40 C240,100 480,100 720,60 C960,20 1200,20 1440,60 L1440,120 L0,120 Z" />
                </svg>
            </div>

            <section id="contacto" className="contact-band">
                <div className="band-inner">
                    {/* Columna izquierda */}
                    <div className="band-left">
                        <p className="eyebrow">{t("eyebrow")}</p>
                        <h2>{t("title")}</h2>
                        <p className="lead">{t("lead")}</p>

                        {/* Chips de info */}
                        <div className="chips">
                            <div className="chip">
                                <span>{t("chips.email.label")}</span>
                                <a href="mailto:info@itaca.upv.es">info@itaca.upv.es</a>
                            </div>
                            <div className="chip">
                                <span>{t("chips.phone.label")}</span>
                                <a href="tel:+34963877000">+34 96 387 70 00</a>
                            </div>
                            <div className="chip">
                                <span>{t("chips.location.label")}</span>
                                <span>{t("chips.location.value")}</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="cta-row">
                            <Link to="/Contact" className="btn-cta">
                                {t("cta")}
                            </Link>
                        </div>
                    </div>

                    {/* Columna derecha con la imagen */}
                    <div className="band-right">
                        <img
                            className="contact-hero-img"
                            src="/assets/contact/Contact.png"
                            alt={t("imageAlt")}
                        />
                    </div>
                </div>
            </section>
        </section>
    );
}
