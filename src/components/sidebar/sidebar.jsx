import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminMainItem, adminSections } from "./SidebarSections";
import SidebarCategoria from "./SidebarCategoria";
import { studentSections } from "../sidebar/studentSections";
import { studentMainItem } from "../sidebar/studentSections";


export default function Sidebar({ sidebarOpen, setSidebarOpen, setVistaActual, vistaActual }) {
  const [hovered, setHovered] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { role, logout } = useAuth();

  useEffect(() => {
    const checkScreen = () => setIsMediumScreen(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isExpanded = isMediumScreen ? hovered : sidebarOpen;
  const sections = role === "admin" ? adminSections : role === "student" ? studentSections : [];
  const mainItem = role === "admin" ? adminMainItem
    : role === "student" ? studentMainItem
      : null;


  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-[#1F2937] transform text-text shadow-lg transition-all duration-300 ease-in-out
        ${isExpanded ? "w-80" : "w-[85px]"}
        ${isMediumScreen ? "static translate-x-0" : sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:inset-0 overflow-y-auto h-screen`}
      onMouseEnter={() => isMediumScreen && setHovered(true)}
      onMouseLeave={() => isMediumScreen && setHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <span className={`text-primary font-bold text-lg transition-opacity duration-200 ${isExpanded ? "opacity-100" : "opacity-0"} ${isMediumScreen ? "hidden md:block" : "block"}`}>
          Logo
        </span>
        {!isMediumScreen && sidebarOpen && (
          <button
            className="text-muted hover:text-text"
            onClick={() => setSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="p-4 space-y-5">

        {Array.isArray(mainItem) &&
          mainItem.map((item) => (
            <SidebarCategoria
              key={item.label}
              {...item}
              expanded={isExpanded}
              vistaActual={vistaActual}
              setVistaActual={setVistaActual}
              setSidebarOpen={setSidebarOpen}
              solo
            />
          ))}


        {sections.map((section) => (
          <SidebarCategoria
            key={section.label}
            {...section}
            expanded={isExpanded}
            vistaActual={vistaActual}
            setVistaActual={setVistaActual}
            setSidebarOpen={setSidebarOpen}
          />
        ))}
      </nav>


    </aside>
  );
}
