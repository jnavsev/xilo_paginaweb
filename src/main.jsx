import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

//ficheros .css
import "./styles/homePage/global.css";
import "./styles/homePage/hero.css";
import "./styles/navbar.css";
import "./styles/homePage/product.css";
import "./styles/homePage/cards.css";
import "./styles/homePage/TeamSection.css";
import "./styles/homePage/partners.css";
import "./styles/footerSection.css";
import "./styles/contactSection.css";
import "./styles/contactPage/contact.css";
import "./styles/knowusPage/knowus.css";
import "./styles/productPage/FisicalProduct.css";
import "./styles/productPage/SoftwareProduct.css";
import "./styles/productPage/VideoProduct.css";
import "./styles/productPage/HeroProduct.css";
import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
