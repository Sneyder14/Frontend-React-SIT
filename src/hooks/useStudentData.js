import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function useStudentData() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const studentId = user?.id_user;

  useEffect(() => {
    if (!studentId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token no encontrado. El estudiante no está autenticado.");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchCursos = async () => {
      try {

        const resAsignados = await axios.get("http://72.61.0.205:8000/api/academics/course-students/", { headers });
        const asignados = Array.isArray(resAsignados.data) ? resAsignados.data : [];
        const cursosDelEstudiante = asignados.filter(c => c.student_id === studentId);


        const resCursos = await axios.get("http://72.61.0.205:8000/api/academics/courses/", { headers });
        const cursosDisponibles = Array.isArray(resCursos.data) ? resCursos.data : [];


        const cursosEnriquecidos = cursosDelEstudiante.map((c, index) => {
          const detalle = cursosDisponibles.find(cd => cd.course_id === c.course_id);

          return {
            course_id: c.course_id,
            course_name: detalle?.name || `Curso ${c.course_id}`,
            course_description: detalle?.description || "Sin descripción",
            enrollment_date: c.enrollment_date || "N/A",
            credits: detalle?.credits ?? 0,
            final_grade: c.final_grade ?? "Sin nota",
            status: c.status || "activo",
          };
        });


        setCursos(cursosEnriquecidos);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar cursos enriquecidos:", err);
        setError("No se pudieron cargar los cursos.");
        setLoading(false);
      }
    };

    fetchCursos();
  }, [studentId]);

  return { cursos, loading, error };
}
