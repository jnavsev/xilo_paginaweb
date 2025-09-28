import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Espera a que el DOM de la nueva ruta esté montado y luego hace scroll al anchor
            const id = hash.replace("#", "");
            const scrollToHash = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    return true;
                }
                return false;
            };

            // Intenta varias veces por si el componente tarda un frame en montarse
            let tries = 0;
            const interval = setInterval(() => {
                if (scrollToHash() || tries > 10) clearInterval(interval);
                tries++;
            }, 50);

            // Primer intento inmediato también
            requestAnimationFrame(scrollToHash);
        } else {
            // Sin hash: comportamiento normal, subir arriba
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }, [pathname, hash]);

    return null;
}
