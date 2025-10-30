
import { useState, useEffect } from "react";

export default function useTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(saved === "dark" || (!saved && prefersDark));
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark); 
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return { isDark, setIsDark };
}
