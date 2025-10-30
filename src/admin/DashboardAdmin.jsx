import { useEffect, useState } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiUserCheck,
  FiClipboard,
  FiCalendar,
} from "react-icons/fi";
import axios from "axios";
import InformePredicciones from "../components/informes/InformePredicciones";
import PendientesAcademicos from "../components/informes/PendientesAcademicos";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usuarios: 0,
    cursos: 0,
    inscripciones: 0,
    tareas: 0,
    semestres: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .all([
        axios.get("http://72.61.0.205:8000/api/academics/teachers/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://72.61.0.205:8000/api/academics/courses/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://72.61.0.205:8000/api/academics/course-students/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://72.61.0.205:8000/api/academics/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://72.61.0.205:8000/api/academics/semesters/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
      .then(
        axios.spread((usuarios, cursos, inscripciones, tareas, semestres) => {
          setStats({
            usuarios: usuarios.data.length,
            cursos: cursos.data.length,
            inscripciones: inscripciones.data.length,
            tareas: tareas.data.length,
            semestres: semestres.data.length,
          });
        })
      )
      .catch(() => {
        console.error("Error al cargar estadísticas del dashboard");
      });
  }, []);

  const dashboardCards = [
    { title: "Usuarios registrados", value: stats.usuarios, icon: <FiUsers />, color: "indigo" },
    { title: "Cursos activos", value: stats.cursos, icon: <FiBookOpen />, color: "green" },
    { title: "Inscripciones hoy", value: stats.inscripciones, icon: <FiUserCheck />, color: "blue" },
    { title: "Tareas pendientes", value: stats.tareas, icon: <FiClipboard />, color: "red" },
    { title: "Semestres en curso", value: stats.semestres, icon: <FiCalendar />, color: "purple" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-gray-50">
      <main className="flex-1 overflow-y-auto p-6">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-[#182130] font-monse tracking-tight">
            Panel Administrativo
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-inter">
            Bienvenido, gestiona tu sistema académico desde aquí
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {dashboardCards.map((card, idx) => (
            <DashboardCard key={idx} {...card} />
          ))}
        </section>

        <InformePredicciones />
        <PendientesAcademicos />
      </main>
    </div>
  );
}

function DashboardCard({ title, value, icon, color }) {
  const colorMap = {
    indigo: { text: "text-indigo-600", bg: "bg-indigo-100/40" },
    green: { text: "text-green-600", bg: "bg-green-100/40" },
    blue: { text: "text-blue-600", bg: "bg-blue-100/40" },
    red: { text: "text-red-600", bg: "bg-red-100/40" },
    purple: { text: "text-purple-600", bg: "bg-purple-100/40" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-100/40" },
  };

  const styles = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-200 w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm text-gray-500 font-semibold font-monse">{title}</h3>
          <p className="text-3xl sm:text-4xl font-bold text-gray-800 font-inter mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.bg} ${styles.text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
