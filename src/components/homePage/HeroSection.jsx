// src/components/HeroSection.jsx
import { useState, useEffect, useRef } from "react";
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
    const [paused, setPaused] = useState(false);

    // estado para mover en tiempo real durante el drag (px)
    const [dragX, setDragX] = useState(0);

    const sliderRef = useRef(null);
    const slidesRef = useRef(null);
    const stateRef = useRef({
        isDragging: false,
        startX: 0,
        lockIndex: 0,
    });

    const autoplayRef = useRef(null);
    const resumeTimeoutRef = useRef(null);

    const clampIndex = (i) => (i + slidesData.length) % slidesData.length;
    const prevSlide = () => setIndex((i) => clampIndex(i - 1));
    const nextSlide = () => setIndex((i) => clampIndex(i + 1));

    // --- autoplay helpers
    const startAutoplay = () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % slidesData.length);
        }, 10000);
    };
    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };
    const scheduleResume = (delayMs = 5000) => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => setPaused(false), delayMs);
    };

    // --- autoplay effect
    useEffect(() => {
        if (!paused) startAutoplay();
        else stopAutoplay();
        return () => stopAutoplay();
    }, [paused]);

    useEffect(() => {
        return () => {
            stopAutoplay();
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        };
    }, []);

    // --- drag/swipe con movimiento en tiempo real
    const onPointerDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;

        setPaused(true);
        stopAutoplay();
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = null;
        }

        stateRef.current.isDragging = true;
        stateRef.current.startX = e.clientX;
        stateRef.current.lockIndex = index;
        setDragX(0);

        sliderRef.current?.setPointerCapture?.(e.pointerId);
        // cursor "grabbing"
        sliderRef.current?.classList.add("is-dragging");
    };

    const onPointerMove = (e) => {
        if (!stateRef.current.isDragging) return;
        setDragX(e.clientX - stateRef.current.startX); // fuerza re-render para mover en vivo
    };

    const finishDrag = (pointerId) => {
        if (!stateRef.current.isDragging) return;

        const width = sliderRef.current?.clientWidth || 1;
        const threshold = width * 0.15;

        if (dragX > threshold) {
            setIndex(clampIndex(stateRef.current.lockIndex - 1));
        } else if (dragX < -threshold) {
            setIndex(clampIndex(stateRef.current.lockIndex + 1));
        }
        // reset
        stateRef.current.isDragging = false;
        setDragX(0);
        sliderRef.current?.releasePointerCapture?.(pointerId);

        sliderRef.current?.classList.remove("is-dragging");
        scheduleResume(5000); // reanuda autoplay en 5 s
    };

    const onPointerUp = (e) => finishDrag(e.pointerId);
    const onPointerCancel = (e) => finishDrag(e.pointerId);

    // offset actual en %, con arrastre en tiempo real
    const width = sliderRef.current?.clientWidth || 1;
    const dragPct = (dragX / width) * 100;
    const currentOffsetPct = -(stateRef.current.lockIndex * 100) + (stateRef.current.isDragging ? dragPct : 0);
    const finalOffsetPct = stateRef.current.isDragging ? currentOffsetPct : -index * 100;

    const handlePrevClick = () => {
        setPaused(true);
        stopAutoplay();
        prevSlide();
        scheduleResume(5000);
    };
    const handleNextClick = () => {
        setPaused(true);
        stopAutoplay();
        nextSlide();
        scheduleResume(5000);
    };

    // evitar drag nativo de la imagen
    const preventImgDrag = (e) => e.preventDefault();

    return (
        <section className="hero-banner" id="home">
            <div
                className="hero-slider"
                ref={sliderRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                style={{ touchAction: "pan-y" }}
                aria-roledescription="carousel"
                aria-live="polite"
            >
                <div
                    className="hero-slides"
                    ref={slidesRef}
                    style={{
                        transform: `translateX(${finalOffsetPct}%)`,
                        transition: stateRef.current.isDragging ? "none" : "transform 400ms ease",
                    }}
                >
                    {slidesData.map((slide, i) => (
                        <div className="hero-slide" key={i}>
                            <img
                                src={slide.img}
                                alt={t(slide.altKey)}
                                className="hero-img"
                                draggable="false"
                                onDragStart={preventImgDrag}
                            />
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

            <button
                className="hero-arrow hero-arrow-left"
                onClick={handlePrevClick}
                aria-label={t("prev", "Previous slide")}
            >
                ‹
            </button>
            <button
                className="hero-arrow hero-arrow-right"
                onClick={handleNextClick}
                aria-label={t("next", "Next slide")}
            >
                ›
            </button>
        </section>
    );
}
