import { useTranslation, Trans } from "react-i18next";

export default function HeroStatic() {
    const { t } = useTranslation("heroStatic");

    return (
        <section className="product-hero" id="hero-product">
            <img
                src="/hero/ImagenHeroProduct.png"
                alt={t("imageAlt")}
                className="product-hero__img"
            />
            <div className="product-hero__overlay" />
            <div className="product-hero__content">
                <h1>
                    <Trans
                        i18nKey="title"
                        ns="heroStatic"
                        components={{ highlight: <span className="product-hero__highlight" /> }}
                    />
                </h1>
            </div>
        </section>
    );
}
