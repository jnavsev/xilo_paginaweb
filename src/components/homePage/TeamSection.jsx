import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TeamSection() {
    const { t } = useTranslation("teamSection");

    const team = [
        { id: "marta", photo: "/assets/team/MartaAguar.jpeg" },
        { id: "antonio", photo: "/assets/team/AntonioMartinez.jpeg" },
        { id: "juan", photo: "/assets/team/JuanNavarro.jpeg" }
    ];

    return (
        <section className="team-wrap" id="team">
            {/* Blob de fondo */}
            <div className="team-blob" aria-hidden="true">
                <svg viewBox="0 0 700 600" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#3cd1c2"
                        d="M423,291Q400,342,350,374Q300,406,250,374Q200,342,177,291Q154,240,177,189Q200,138,250,106Q300,74,350,106Q400,138,423,189Q446,240,423,291Z"
                    />
                </svg>
            </div>

            <div className="team-inner">
                {/* Tarjetas */}
                <div className="team-grid">
                    {team.map((m) => {
                        const name = t(`members.${m.id}.name`);
                        const role = t(`members.${m.id}.role`);
                        const desc = t(`members.${m.id}.desc`, { defaultValue: "" });
                        return (
                            <article className="member-card" key={m.id}>
                                <div className="member-photo">
                                    <img src={m.photo} alt={name} loading="lazy" />
                                </div>
                                <div className="member-info">
                                    <h3 className="member-name">{name}</h3>
                                    <p className="member-role">{role}</p>
                                    {desc && <p className="member-desc">{desc}</p>}
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Lateral derecho */}
                <aside className="team-aside">
                    <p className="aside-eyebrow">{t("eyebrow")}</p>
                    <h2 className="aside-title">
                        {t("title.line1")} <br /> {t("title.line2")}
                    </h2>
                    <Link to="/KnowUs" className="team-cta">
                        {t("cta")} <span>→</span>
                    </Link>
                </aside>
            </div>
        </section>
    );
}
