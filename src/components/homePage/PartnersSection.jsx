import { useTranslation } from "react-i18next";

export default function PartnersSection() {
    const { t } = useTranslation("partners");

    const partners = [
        {
            id: "upv",
            logo: "/assets/partners/logoUPV.png",
            url: "https://www.upv.es/"
        },
        {
            id: "sabien",
            logo: "/assets/partners/logoSabien.png",
            url: "https://www.sabien.upv.es/"
        },
        {
            id: "lafe",
            logo: "/assets/partners/laFe.png",
            url: "https://www.iislafe.es/es/"
        }
    ];

    return (
        <section className="partners-section" id="sponsors">
            <p className="partners-eyebrow">{t("eyebrow")}</p>
            <h2 className="partners-title">{t("title")}</h2>

            <div className="partners-logos">
                {partners.map((p) => (
                    <a
                        key={p.id}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner"
                    >
                        <img src={p.logo} alt={t(`list.${p.id}.name`)} />
                    </a>
                ))}
            </div>
        </section>
    );
}
