import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

// Vistas estudiante
import Tareas from "../components/estudiantes/Tareas";
import TemasTutorias from "../components/estudiantes/TemasTurorias";
import Calificaciones from "../components/estudiantes/Calificaciones";
import Cursos from "../components/estudiantes/Cursos";
import EjerciciosDeApoyo from "../components/estudiantes/EjerciciosDeApoyo";
import DashboardEstudiante from "../components/dashboard/DashboardEstudiante";

// Vistas admin
import DashboardAdmin from "../admin/DashboardAdmin";
import CursosAdmin from "../admin/CursosAdmin";
import Registros from "./Registros";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vistaActual, setVistaActual] = useState("dashboard");
  const { role, user } = useAuth();

  let vistaRenderizada;

  console.log("Rol actual:", role);
  console.log("Usuario actual:", user);


  if (!role) {
    vistaRenderizada = (
      <div className="p-6 text-center text-red-500 font-semibold">
        No se ha definido el rol del usuario.
      </div>
    );
  } else if (role === "student") {
    switch (vistaActual) {
      case "dashboard":
        vistaRenderizada = <DashboardEstudiante />;
        break;
      case "tareas":
        vistaRenderizada = <Tareas />;
        break;
      case "apoyo":
        vistaRenderizada = <TemasTutorias />;
        break;
      case "calificaciones":
        vistaRenderizada = <Calificaciones />;
        break;
      case "cursos":
        vistaRenderizada = <Cursos />;
        break;
      case "ejerciciosDeApoyo":
        vistaRenderizada = <EjerciciosDeApoyo />;
        break;
      default:
        vistaRenderizada = (
          <div className="p-6 text-center text-gray-500">
            Esta sección no está disponible para estudiantes.
          </div>
        );
    }
  } else if (role === "admin") {
    if (vistaActual.startsWith("registros")) {
      const subVista = vistaActual.split(":")[1] || "estudiantes";
      vistaRenderizada = (
        <Registros
          subVista={subVista}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setVistaActual={setVistaActual}
        />
      );
    } else {
      switch (vistaActual) {
        case "dashboard":
          vistaRenderizada = <DashboardAdmin />;
          break;
        case "cursosAdmin":
          vistaRenderizada = <CursosAdmin />;
          break;
        default:
          vistaRenderizada = (
            <div className="p-6 text-center text-gray-500">
              Vista no disponible para administrador.
            </div>
          );
      }
    }
  }



  return (
    <div className="flex h-screen bg-[#FFFF] font-[poppins] relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-in-out md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setVistaActual={setVistaActual}
        vistaActual={vistaActual}
      />

      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 relative overflow-hidden">
          <div
            key={vistaActual}
            className="absolute inset-0 transition-all duration-500 ease-in-out animate-fade"
          >
            {vistaRenderizada}
          </div>
        </div>
      </div>
    </div>
  );
}
