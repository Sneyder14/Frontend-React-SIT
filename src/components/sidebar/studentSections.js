import {
  ClipboardList,
  NotebookPen,
  School,
  BookOpen,
  PieChart,
} from "lucide-react";


export const studentMainItem = [{
  label: "Dashboard Estudiantil",
  vista: "dashboard:student",
  icon: PieChart,
}];

export const studentSections = [
  {
    label: "Mis Cursos",
    icon: BookOpen,
    items: [
      { label: "Cursos", vista: "cursos" },
      { label: "Calificaciones", vista: "calificaciones" },
    ],
  },
  {
    label: "Tareas",
    icon: ClipboardList,
    items: [
      { label: "Tareas", vista: "tareas" },
      { label: "Ejercicios de Apoyo", vista: "ejerciciosDeApoyo" },
    ],
  },
  {
    label: "Tutoría",
    icon: School,
    items: [
      { label: "Temas Tutoría", vista: "apoyo" },
    ],
  },
];
