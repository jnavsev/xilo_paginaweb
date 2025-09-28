import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n"; // asegúrate de tener la init

export default function Navbar() {
    const { t } = useTranslation("navbar");
    const [open, setOpen] = useState(false);
    const [solid, setSolid] = useState(false);
    const [lang, setLang] = useState(i18n.language?.startsWith("en") ? "EN" : "ES");

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const close = () => setOpen(false);

    const changeLang = async (lng) => {
        setLang(lng.toUpperCase());
        await i18n.changeLanguage(lng); // esto re-renderiza con el nuevo idioma
        // opcional: persistir
        localStorage.setItem("i18nextLng", lng);
    };

    return (
        <header className={`navbar ${solid ? "solid" : ""}`}>
            <div className="nav-container">
                {/* Izquierda: logo → al inicio del Home */}
                <HashLink to="/#home" className="brand" onClick={close} smooth>
                    <span className="brand-logo" />
                    <span className="brand-name">{t("brand")}</span>
                </HashLink>

                {/* Center: links (desktop) */}
                <nav className="nav-links">
                    <HashLink to="/#home" smooth>{t("home")}</HashLink>
                    <NavLink to="/product">{t("product")}</NavLink>
                    <NavLink to="/knowUs">{t("team")}</NavLink>
                    <HashLink to="/#sponsors" smooth>{t("partners")}</HashLink>
                    <NavLink to="/contact" className="btn-cta">{t("contact")}</NavLink>
                </nav>

                {/* Right: language + burger */}
                <div className="nav-actions">
                    <div className="lang-switch" role="group" aria-label={t("aria.langSwitch")}>
                        <button
                            className={`lang-btn ${lang === "ES" ? "active" : ""}`}
                            aria-pressed={lang === "ES"}
                            onClick={() => changeLang("es")}
                        >ES</button>
                        <button
                            className={`lang-btn ${lang === "EN" ? "active" : ""}`}
                            aria-pressed={lang === "EN"}
                            onClick={() => changeLang("en")}
                        >EN</button>
                    </div>

                    {/* Mobile burger */}
                    <button
                        className="burger"
                        aria-label={t("aria.openMenu")}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div className={`nav-drawer ${open ? "open" : ""}`}>
                <HashLink to="/#home" onClick={close} smooth>{t("home")}</HashLink>
                <NavLink to="/product" onClick={close}>{t("product")}</NavLink>
                <NavLink to="/knowUs" onClick={close}>{t("team")}</NavLink>
                <HashLink to="/#sponsors" onClick={close} smooth>{t("partners")}</HashLink>
                <NavLink to="/contact" onClick={close} className="btn-cta full">
                    {t("contact")}
                </NavLink>

                <div className="drawer-bottom">
                    <div className="lang-switch">
                        <button
                            className={`lang-btn ${lang === "ES" ? "active" : ""}`}
                            onClick={() => changeLang("es")}
                        >ES</button>
                        <button
                            className={`lang-btn ${lang === "EN" ? "active" : ""}`}
                            onClick={() => changeLang("en")}
                        >EN</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
