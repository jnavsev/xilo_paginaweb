import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductSection() {
    const { t } = useTranslation("product");

    return (
        <section id="products" className="product-section wave-wrap">
            <div className="product-inner">
                {/* IZQUIERDA: texto */}
                <div className="product-left">
                    <div className="product-header">
                        <span className="product-eyebrow">{t("eyebrow")}</span>
                        <h2 className="product-title">{t("title")}</h2>
                        <p className="product-sub">{t("subtitle")}</p>
                        <Link to="/Product" className="btn-cta product-cta">
                            {t("cta")}
                        </Link>
                    </div>
                </div>

                {/* DERECHA: dispositivo */}
                <aside className="product-device">
                    <div className="product-frame">
                        <img
                            src="/assets/product/device.png"
                            alt={t("imageAlt")}
                        />
                    </div>
                </aside>
            </div>

            {/* Ola inferior */}
            <div className="wave-bottom-product" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,40 C240,100 480,100 720,60 C960,20 1200,20 1440,60 L1440,120 L0,120 Z" />
                </svg>
            </div>
        </section>
    );
}
