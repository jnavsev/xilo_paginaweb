import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { FaMicroscope } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { useTranslation } from "react-i18next";

export default function SoftwareSection() {
    const { t } = useTranslation("softwareSection");

    const ITEMS = [
        { id: "identification", icon: <HiOutlineDocumentSearch /> },
        { id: "ai", icon: <GiArtificialIntelligence /> },
        { id: "impact", icon: <MdHealthAndSafety /> },
        { id: "validation", icon: <FaMicroscope /> }
    ];

    return (
        <section className="product-s2 section">
            {/* ======= TÍTULO ======= */}
            <div className="s2-header">
                <h2>{t("title")}</h2>
            </div>

            <div className="s2-inner">
                {/* IZQUIERDA: Imagen ilustrativa */}
                <aside className="s2-image">
                    <div className="s2-frame">
                        <img
                            src="/assets/product/software.jpg"
                            alt={t("imageAlt")}
                        />
                    </div>
                </aside>

                {/* DERECHA: 4 cards en rejilla 2x2 */}
                <div className="s2-cards">
                    {ITEMS.map((it) => (
                        <article key={it.id} className="s2-card">
                            <div className="s2-icon">{it.icon}</div>
                            <h3>{t(`items.${it.id}.title`)}</h3>
                            <p>{t(`items.${it.id}.desc`)}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
