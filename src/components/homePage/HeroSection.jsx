// src/components/HeroSection.jsx
import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

const slidesData = [
    { img: "/hero/hero2-1920.jpg", altKey: "slides.0.alt", titleKey: "slides.0.title", textKey: "slides.0.text" },
    { img: "/hero/hero1-1920.jpg", altKey: "slides.1.alt", titleKey: "slides.1.title", textKey: "slides.1.text" },
    { img: "/hero/hero3-1920.jpg", altKey: "slides.2.alt", titleKey: "slides.2.title", textKey: "slides.2.text" },
    { img: "/hero/hero4-1920.jpg", altKey: "slides.3.alt", titleKey: "slides.3.title", textKey: "slides.3.text" },
];

export default function HeroSection() {
    const { t } = useTranslation("hero");
    const [index, setIndex] = useState(0);

    const prevSlide = () => setIndex((index - 1 + slidesData.length) % slidesData.length);
    const nextSlide = () => setIndex((index + 1) % slidesData.length);

    useEffect(() => {
        const timer = setInterval(() => setIndex((i) => (i + 1) % slidesData.length), 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero-banner" id="home">
            <div className="hero-slider">
                <div className="hero-slides" style={{ transform: `translateX(-${index * 100}%)` }}>
                    {slidesData.map((slide, i) => (
                        <div className="hero-slide" key={i}>
                            <img src={slide.img} alt={t(slide.altKey)} className="hero-img" />
                            <div className="hero-overlay" />
                            <div className="hero-content">
                                <h1>
                                    <Trans
                                        i18nKey={slide.titleKey}
                                        ns="hero"
                                        components={{ highlight: <span className="highlight" /> }}
                                    />
                                </h1>
                                <p>{t(slide.textKey)}</p>
                                <div className="hero-buttons">
                                    <a href="#products" className="btn-secondary">{t("cta")}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <span className="hero-arrow hero-arrow-left" onClick={prevSlide}>‹</span>
            <span className="hero-arrow hero-arrow-right" onClick={nextSlide}>›</span>
        </section>
    );
}
