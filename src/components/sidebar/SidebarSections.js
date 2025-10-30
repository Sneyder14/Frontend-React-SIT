import {
    BookOpen,
    Users,
    ClipboardList,
    ListChecks,
    School,
    ClipboardType,
    NotebookPen,
    TerminalSquare,
    GraduationCap,
    FileText,
    BarChart3,
    UserCheck,
    UserCog,
    Settings,
    PieChart,
    ActivitySquare
} from "lucide-react";

export const adminMainItem = [{
    label: "Dashboard",
    vista: "dashboard",
    icon: PieChart,
},
{
    label: "Predicciones del Modelo",
    vista: "registros:prediccionesmodelo",
    icon: ActivitySquare,
},
]


export const adminSections = [
    {
        label: "Gestión Académica",
        icon: BookOpen,
        items: [
            { label: "Cursos", vista: "registros:cursos", icon: BookOpen },
            { label: "Semestres", vista: "registros:semestres", icon: GraduationCap },
            { label: "Tipos de Corte", vista: "registros:tiposCorte", icon: ClipboardList },
            { label: "Cortes Académicos", vista: "registros:cortes", icon: ClipboardList },
            { label: "Tipos de Clasificación", vista: "registros:classificationTypes", icon: ClipboardList },
        ],
    },

    {
        label: "Asignaciones de Curso",
        icon: ClipboardList,
        items: [
            { label: "Estudiantes por Curso", vista: "registros:courseStudents", icon: Users },
            { label: "Docentes por Curso", vista: "registros:courseTeachers", icon: UserCheck },
        ],
    },

    {
        label: "Tareas y Ejercicios",
        icon: ClipboardType,
        items: [
            { label: "Tareas Académicas", vista: "registros:tareas", icon: ClipboardType },
            { label: "Tareas Estudiante", vista: "registros:tareasestudiante", icon: ClipboardList },
            { label: "Ejercicios de Apoyo", vista: "registros:ejerciciosapoyo", icon: NotebookPen },
            { label: "Intentos de Ejercicio", vista: "registros:intentosejercicio", icon: TerminalSquare },
        ],
    },

    {
        label: "Usuarios y Roles",
        icon: Users,
        items: [
            { label: "Usuarios", vista: "registros:usuarios", icon: UserCog },
            { label: "Profesores", vista: "registros:profesores", icon: UserCheck },
            { label: "Estudiantes", vista: "registros:estudiantes", icon: Users },
        ],
    },

    {
        label: "Evaluación",
        icon: BarChart3,
        items: [
            { label: "Calificaciones", vista: "registros:calificacionestareas", icon: BarChart3 },
            { label: "Notas por Corte", vista: "registros:notasCorte", icon: ClipboardList },
        ],
    },

    {
        label: "MSLQ",
        icon: ListChecks,
        items: [
            { label: "Encabezados", vista: "registros:encabezadosmslq", icon: ListChecks },
            { label: "Ítems", vista: "registros:itemsmslq", icon: ListChecks },
            { label: "Respuestas", vista: "registros:respuestasmslq", icon: ListChecks },
            { label: "Detalles", vista: "registros:respuestasDetallesmslq", icon: FileText },
        ],
    },

    {
        label: "Tutoría",
        icon: School,
        items: [
            { label: "Grupos", vista: "registros:grupostutoria", icon: School },
            { label: "Participación", vista: "registros:participaciontutoria", icon: Users },
            { label: "Temas Tutoría", vista: "registros:temastutoria", icon: BookOpen },
            { label: "Temas Apoyo", vista: "registros:temasapoyo", icon: NotebookPen },
        ],
    },
];
