import React from "react";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { FaRegHospital } from "react-icons/fa";
import { HiOutlineFingerPrint } from "react-icons/hi";
import { TbCloudDataConnection } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export default function FisicalProduct() {
    const { t } = useTranslation("fisicalProduct");

    const ITEMS = [
        { id: "capture", icon: <HiOutlineFingerPrint /> },
        { id: "ergonomic", icon: <MdOutlineSettingsInputComponent /> },
        { id: "standards", icon: <TbCloudDataConnection /> },
        { id: "clinical", icon: <FaRegHospital /> }
    ];

    return (
        <section className="product-s1 wave-wrap">
            {/* ======= TÍTULO ======= */}
            <div className="s1-header">
                <h2>{t("title")}</h2>
            </div>

            <div className="s1-inner">
                {/* IZQUIERDA: 4 cards en rejilla 2x2 */}
                <div className="s1-cards">
                    {ITEMS.map((it) => (
                        <article key={it.id} className="s1-card">
                            <div className="s1-icon">{it.icon}</div>
                            <h3>{t(`items.${it.id}.title`)}</h3>
                            <p>{t(`items.${it.id}.desc`)}</p>
                        </article>
                    ))}
                </div>

                {/* DERECHA: dispositivo grande */}
                <aside className="s1-device">
                    <div className="s1-frame">
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
