import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import KnowUs from "./pages/KnowUs.jsx";


export default function App() {
    return (
        <div className="app">
            <ScrollToTop />
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product/>} />
                    <Route path="/knowUs" element={<KnowUs/>} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
