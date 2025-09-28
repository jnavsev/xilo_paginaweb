import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FaCloud, FaBrain, FaWatchmanMonitoring, FaChartLine } from "react-icons/fa";

import TeamSection from "../components/homePage/TeamSection.jsx";
import PartnersSection from "../components/homePage/PartnersSection.jsx";
import HeroSection from "../components/homePage/HeroSection.jsx";
import ValuePropsSection from "../components/ValueProps.jsx";
import ProductSection from "../components/homePage/ProductSection.jsx";
import ContactSection from "../components/ContactSection.jsx";

export default function Home() {
    return (
        <div className="landing">

            <HeroSection/>

            <ProductSection/>

            <ValuePropsSection/>


            <section className="sectionTeam">
                <TeamSection/>
            </section>
            <section className="sectionPartners">
                <PartnersSection/>
            </section>
            <ContactSection />

        </div>
    );
}
