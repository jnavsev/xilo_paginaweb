import React from "react";
import { useTranslation, Trans } from "react-i18next";
import ContactSection from "../components/ContactSection.jsx";

const TEAM = [
    {
        id: "marta",
        img: "/assets/team/MartaAguar.jpeg",
        links: { linkedin: "https://www.linkedin.com/in/marta-aguar-carrascosa-1bb455b/" },
    },
    {
        id: "antonio",
        img: "/assets/team/AntonioMartinez.jpeg",
        links: { linkedin: "https://www.linkedin.com/in/anmarmil/" },
    },
    {
        id: "juan",
        img: "/assets/team/JuanNavarro.jpeg",
        links: { linkedin: "https://www.linkedin.com/in/juan-navarro-sevilla-03525b239" },
    },
];

function TeamCard({ person }) {
    const { t } = useTranslation("knowUs");
    const { id, img, links = {} } = person;

    const name = t(`team.${id}.name`);
    const role = t(`team.${id}.role`);
    const bioKey = `team.${id}.bio`;

    return (
        <article className="team-card horizontal">
            <div className="avatar">
                <img src={img} alt={name} loading="lazy" />
            </div>
            <div className="info">
                <h3>{name}</h3>
                <p className="role">{role}</p>
                {/* La bio puede contener saltos de línea y HTML simple */}
                <p className="bio">
                    <Trans i18nKey={bioKey} ns="knowUs" />
                </p>
                <div className="links" aria-label={t("aria.socialOf", { name })}>
                    {links.linkedin && (
                        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24">
                                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4zM8 8h3.8v2.05h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5V23H8z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function KnowUsPage() {
    const { t } = useTranslation("knowUs");

    return (
        <main className="knowus">
            <div className="wave-top" aria-hidden="true">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,40 C240,100 480,100 720,60 C960,20 1200,20 1440,60 L1440,0 L0,0 Z" />
                </svg>
            </div>

            <header className="ku-hero container-knowUs">
                <h1>{t("title")}</h1>
                <p className="subtitle">{t("subtitle")}</p>
            </header>

            <section className="ku-grid container-knowUs">
                {TEAM.map((p) => (
                    <TeamCard key={p.id} person={p} />
                ))}
            </section>

            <ContactSection />
        </main>
    );
}
