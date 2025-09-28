// src/pages/Product.jsx
import React from "react";
import ContactSection from "../components/ContactSection.jsx";
import FisicalProduct from "../components/productPage/FisicalProduct.jsx";
import SoftwareProduct from "../components/productPage/SoftwareSection.jsx";
import VideoProduct from "../components/productPage/VideoSection.jsx";
import HeroProduct from "../components/productPage/HeroSectionProduct.jsx";

export default function Product() {
    return (
        <main>
            <HeroProduct />
            <FisicalProduct />
            <SoftwareProduct />
            <VideoProduct />
            <ContactSection />
        </main>
    );
}
