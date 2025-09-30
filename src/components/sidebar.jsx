import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  Home,
  Users,
  Folder,
  FileText,
  ClipboardList,
  BookOpen,
  NotebookPen,
  Calendar,
  User,
  Scissors,
  FileTextIcon,
  Tags,
  GraduationCap,
  School,
  Percent,
  Heading,
  ListChecks,
  ListTodo,
  ClipboardCheck,
  TerminalSquare,
  ClipboardType,
  ClipboardPen,
  UsersRound,
  FileUser,
  BookOpenText
} 
from "lucide-react";
import SiderLink from "./SiderLink";


export default function Sidebar({ sidebarOpen, setSidebarOpen, setVistaActual, vistaActual }) {
  const [hovered, setHovered] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    const checkScreen = () => setIsMediumScreen(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isExpanded = isMediumScreen ? hovered : sidebarOpen;

  const studentLinks = [
    { label: "Dashboard", vista: "dashboard", icon: Home },
    { label: "Tareas", vista: "tareas", icon: FileText },
    { label: "Tutorias", vista: "apoyo", icon: Folder },
    { label: "Calificaciones", vista: "calificaciones", icon: ClipboardList },
    { label: "Cursos", vista: "cursos", icon: BookOpen },
    { label: "Ejercicios", vista: "ejerciciosDeApoyo", icon: NotebookPen }

  ];

  const adminLinks = [
    { label: "Dashboard", vista: "dashboard", icon: Home },
    { label: "Usuarios", vista: "registros:usuarios", icon: Users },
    { label: "Cursos", vista: "registros:cursos", icon: BookOpen },
    { label: "Profesores", vista: "registros:profesores", icon: ClipboardList },
    { label: "Semestres", vista: "registros:semestres", icon: Calendar },
    { label: "Estudiantes", vista: "registros:estudiantes", icon: User },
    { label: "Cortes Académicos", vista: "registros:cortes", icon: Scissors },
    { label: "Notas por Corte", vista: "registros:notasCorte", icon: FileTextIcon },
    { label: "Tipos de Clasificación", vista: "registros:clasificaciones", icon: Tags },
    { label: "Estudiantes por Curso", vista: "registros:cursoEstudiantes", icon: GraduationCap },
    { label: "Docentes por Curso", vista: "registros:cursoDocentes", icon: School },
    { label: "Tipos de Corte", vista: "registros:tiposCorte", icon: Percent },
    { label: "Encabezados MSLQ", vista: "registros:encabezadosmslq", icon: Heading },
    { label: "Detalles Respuestas MSLQ", vista: "registros:respuestasDetallesmslq", icon: ListChecks },
    { label: "Ítems MSLQ", vista: "registros:itemsmslq", icon: ListTodo },
    { label: "Respuestas MSLQ", vista: "registros:respuestasmslq", icon: ClipboardCheck },
    { label: "Intentos de Ejercicio", vista: "registros:intentosejercicio", icon: TerminalSquare },
    { label: "Tareas Estudiante", vista: "registros:tareasestudiante", icon: ClipboardList },
    { label: "Ejercicios de Apoyo", vista: "registros:ejerciciosapoyo", icon: NotebookPen },
    { label: "Temas de Apoyo", vista: "registros:temasapoyo", icon: NotebookPen },
    { label: "Tareas Académicas", vista: "registros:tareas", icon: ClipboardType },
    { label: "Calificaciones de Tareas", vista: "registros:calificacionestareas", icon: ClipboardPen },
    { label: "Grupos de Tutoría", vista: "registros:grupostutoria", icon: UsersRound },
    { label: "Participación Tutoría", vista: "registros:participaciontutoria", icon: FileUser },
    { label: "Temas de Tutoría", vista: "registros:temastutoria", icon: BookOpenText }
  ];


  const links = role === "student" ? studentLinks : adminLinks;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 transform bg-[#101828] text-[#FCFCEF] shadow-lg transition-all duration-300 ease-in-out
        ${isExpanded ? "w-80" : "w-[85px]"} 
        ${isMediumScreen ? "static translate-x-0" : sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:inset-0 overflow-y-auto h-screen scroll-left`}
      onMouseEnter={() => isMediumScreen && setHovered(true)}
      onMouseLeave={() => isMediumScreen && setHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <span className={`text-indigo-600 font-bold text-lg transition-opacity duration-200 ${isExpanded ? "opacity-100" : "opacity-0"} ${isMediumScreen ? "hidden md:block" : "block"}`}>
          Logo
        </span>
        {!isMediumScreen && sidebarOpen && (
          <button
            className="text-gray-600 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="p-4 space-y-2 duration-300 ease-in-out">
        {links.map((link) => (
          <SiderLink
            key={link.vista}
            icon={link.icon}
            label={link.label}
            vista={link.vista}
            setVistaActual={setVistaActual}
            setSidebarOpen={setSidebarOpen}
            active={vistaActual === link.vista}
            expanded={isExpanded}
          />
        ))}
      </nav>
    </aside>
  );
}
