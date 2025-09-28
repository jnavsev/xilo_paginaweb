// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/** ES */
// @ts-ignore
import es_contact from "../locales/es/contact.json";
// @ts-ignore
import es_knowUs from "../locales/es/knowUs.json";
// @ts-ignore
import es_hero from "../locales/es/hero.json";
// @ts-ignore
import es_partners from "../locales/es/partners.json";
// @ts-ignore
import es_product from "../locales/es/product.json";
// @ts-ignore
import es_teamSection from "../locales/es/teamSection.json";
// @ts-ignore
import es_footer from "../locales/es/footer.json";
// @ts-ignore
import es_navbar from "../locales/es/navbar.json";
// @ts-ignore
import es_contactSection from "../locales/es/contactSection.json";
// @ts-ignore
import es_heroStatic from "../locales/es/heroStatic.json";
// @ts-ignore
import es_valueProps from "../locales/es/valueProps.json";
// @ts-ignore
import es_fisicalProduct from "../locales/es/fisicalProduct.json";
// @ts-ignore
import es_softwareSection from "../locales/es/softwareSection.json";

/** EN */
// @ts-ignore
import en_contact from "../locales/en/contact.json";
// @ts-ignore
import en_knowUs from "../locales/en/knowUs.json";
// @ts-ignore
import en_hero from "../locales/en/hero.json";
// @ts-ignore
import en_partners from "../locales/en/partners.json";
// @ts-ignore
import en_product from "../locales/en/product.json";
// @ts-ignore
import en_teamSection from "../locales/en/teamSection.json";
// @ts-ignore
import en_footer from "../locales/en/footer.json";
// @ts-ignore
import en_navbar from "../locales/en/navbar.json";
// @ts-ignore
import en_contactSection from "../locales/en/contactSection.json";
// @ts-ignore
import en_heroStatic from "../locales/en/heroStatic.json";
// @ts-ignore
import en_valueProps from "../locales/en/valueProps.json";
// @ts-ignore
import en_fisicalProduct from "../locales/en/fisicalProduct.json";
// @ts-ignore
import en_softwareSection from "../locales/en/softwareSection.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "es",
        supportedLngs: ["es", "en"],
        // Detección y persistencia del idioma
        detection: {
            order: ["localStorage", "navigator", "htmlTag", "querystring"],
            caches: ["localStorage"],
        },
        interpolation: { escapeValue: false },
        // (opcional) evita que renderice "null" si falta una clave
        returnNull: false,
        resources: {
            es: {
                contact: es_contact,
                knowUs: es_knowUs,
                hero: es_hero,
                partners: es_partners,
                product: es_product,
                teamSection: es_teamSection,
                footer: es_footer,
                navbar: es_navbar,
                contactSection: es_contactSection,
                heroStatic: es_heroStatic,
                valueProps: es_valueProps,
                fisicalProduct: es_fisicalProduct,
                softwareSection: es_softwareSection,
            },
            en: {
                contact: en_contact,
                knowUs: en_knowUs,
                hero: en_hero,
                partners: en_partners,
                product: en_product,
                teamSection: en_teamSection,
                footer: en_footer,
                navbar: en_navbar,
                contactSection: en_contactSection,
                heroStatic: en_heroStatic,
                valueProps: en_valueProps,
                fisicalProduct: en_fisicalProduct,
                softwareSection: en_softwareSection,
            },
        },
    });

export default i18n;
