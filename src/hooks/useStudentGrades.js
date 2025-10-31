import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function useStudentGrades() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const studentId = user?.id_user;

    useEffect(() => {
        if (!studentId) return;

        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const fetchGrades = async () => {
            try {
                
                const resGrades = await axios.get("http://72.61.0.205:8000/api/academics/task-grades/", { headers });
                const grades = Array.isArray(resGrades.data) ? resGrades.data : [];

                
                const resAsignaciones = await axios.get("http://72.61.0.205:8000/api/academics/students-tasks/", { headers });
                const asignaciones = Array.isArray(resAsignaciones.data) ? resAsignaciones.data : [];

              
                const resTareas = await axios.get("http://72.61.0.205:8000/api/academics/tasks/", { headers });
                const tareas = Array.isArray(resTareas.data) ? resTareas.data : [];

                
                const notas = grades
                    .map((g) => {
                        const asignacion = asignaciones.find(a => a.students_task_id === g.students_task_id);
                        if (!asignacion || asignacion.students_student_id !== studentId) return null;

                        const tarea = tareas.find(t => t.task_id === asignacion.task_task_id);

                        return {
                            tarea: tarea?.name || `Tarea ${asignacion.task_task_id}`,
                            nota: g.grade || "Sin nota",
                            estado: g.status || "pendiente",
                            entrega: g.delivery_time || null,
                            resultados: g.results || null,
                        };
                    })
                    .filter(Boolean);

                setCalificaciones(notas);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar calificaciones:", err);
                setError("No se pudieron cargar las calificaciones.");
                setLoading(false);
            }
        };

        fetchGrades();
    }, [studentId]);

    return { calificaciones, loading, error };
}
