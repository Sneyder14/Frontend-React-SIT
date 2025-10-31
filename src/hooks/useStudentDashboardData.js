import { useEffect, useState } from "react";
import axios from "axios";

export default function useStudentDashboardData(studentId) {
    const [tareas, setTareas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Token no encontrado. El estudiante no está autenticado.");
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const fetchData = async () => {
            try {
                const [cursosRes, tareasRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/academics/course-students/", { headers }),
                    axios.get("http://72.61.0.205:8000/api/academics/task-grades/", { headers }),
                ]);

                const cursosData = Array.isArray(cursosRes.data) ? cursosRes.data : [];
                const tareasData = Array.isArray(tareasRes.data) ? tareasRes.data : [];

                const cursosFiltrados = cursosData.filter(c => c.student_id === studentId);
                const tareasFiltradas = tareasData.filter(t => t.students_student_id === studentId);

                const tareasEnriquecidas = tareasFiltradas.map((t, index) => ({
                    id: t.task_grade_id || `tarea-${index}`,
                    students_task_id: t.students_task_id,
                    task_task_id: t.task_task_id,
                    nota: t.grade || null,
                    estado: "pendiente",
                    fecha_entrega: "2025-09-01", 
                }));

                setCursos(cursosFiltrados);
                setTareas(tareasEnriquecidas);
                setCalificaciones(tareasEnriquecidas.map(t => t.nota));
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar datos del estudiante:", error);
                setCursos([]);
                setTareas([]);
                setCalificaciones([]);
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);

    return { tareas, cursos, calificaciones, loading };
}
