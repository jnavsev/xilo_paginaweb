import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation("footer");

    return (
        <footer className="footer-wrap">
            <div className="footer-inner">
                {/* Columna 1: Logo + Dirección */}
                <div className="f-col f-brand">
                    <NavLink to="/" className="f-logo" aria-label={t("brand.name")}>
                        <img
                            src="/assets/logo/logo-xilo-footer.png"
                            alt={t("brand.name")}
                            className="f-logo-img"
                            loading="lazy"
                            width="160"
                            height="40"
                        />
                    </NavLink>

                    <address className="f-address">
                        <strong>{t("brand.address.line1")}</strong><br />
                        {t("brand.address.line2")}<br />
                        {t("brand.address.line3")}<br />
                        {t("brand.address.line4")}<br />
                        {t("brand.address.line5")}<br />
                        {t("brand.address.line6")}<br />
                        {t("brand.address.line7")}
                    </address>

                    <ul className="f-contact">
                        <li>
                            <FiMapPin aria-hidden="true" />
                            <a
                                href="https://www.google.com/maps/dir/39.4926359,-0.359996/Universidad+Politecnica+de+Valencia.+Ciudad+Politecnica+de+la+Innovacion.,+Camino+de+Vera+s%2Fn,+Edificio+8G.+Acceso+B,+1%C2%BA+piso,,+46022+Valencia"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t("brand.directions")}
                            </a>
                        </li>
                        <li>
                            <FiMail aria-hidden="true" />
                            <a href="mailto:info@itaca.upv.es">info@itaca.upv.es</a>
                        </li>
                        <li>
                            <FiPhone aria-hidden="true" />
                            <a href="tel:+34963877000">+34 96 387 70 00</a>
                        </li>
                    </ul>
                </div>

                {/* Columna 2: Enlaces rápidos */}
                <nav className="f-col f-links" aria-label={t("links.ariaLabel")}>
                    <h3>{t("links.title")}</h3>
                    <ul>
                        <li><HashLink to="/#home" smooth>{t("links.home")}</HashLink></li>
                        <li><NavLink to="/product">{t("links.product")}</NavLink></li>
                        <li><NavLink to="/knowUs">{t("links.team")}</NavLink></li>
                        <li><HashLink to="/#sponsors" smooth>{t("links.partners")}</HashLink></li>
                        <li><NavLink to="/contact">{t("links.contact")}</NavLink></li>
                    </ul>
                </nav>

                {/* Columna 3: CTA */}
                <div className="f-col f-cta">
                    <h3>{t("cta.title")}</h3>
                    <p>{t("cta.subtitle")}</p>
                    <div className="f-buttons">
                        <NavLink to="/contact" className="pill">
                            {t("cta.button")}
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} XILO · UPV — {t("bottom.rights")}</p>
                <div className="f-bottom-links">
                    <NavLink to="/privacy">{t("bottom.privacy")}</NavLink>
                    <NavLink to="/terms">{t("bottom.terms")}</NavLink>
                    <NavLink to="/cookies">{t("bottom.cookies")}</NavLink>
                </div>
            </div>
        </footer>
    );
}
