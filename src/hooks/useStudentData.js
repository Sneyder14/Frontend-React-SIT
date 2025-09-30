import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function useStudentData() {
  const { token } = useAuth();

  const [data, setData] = useState({
    tareas: [],
    temas: [],
    calificaciones: [],
    cursos: [],
    ejercicios: [],
    participacion: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [
          tareasRes,
          temasTutoriasRes,
          calificacionesRes,
          cursosRes,
          ejerciciosDeApoyoRes,
        ] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/academics/tasks", { headers }),
          axios.get("http://127.0.0.1:8000/api/academics/tutoring-topics", { headers }),
          axios.get("http://127.0.0.1:8000/api/academics/task-grades", { headers }),
          axios.get("http://127.0.0.1:8000/api/academics/course-students", { headers }),
          axios.get("http://127.0.0.1:8000/api/academics/support-exercises", { headers }),
        ]);

        setData({
          tareas: tareasRes.data,
          temas: temasTutoriasRes.data,
          calificaciones: calificacionesRes.data,
          cursos: cursosRes.data,
          ejercicios: ejerciciosDeApoyoRes.data,
          participacion: null,
          loading: false,
          error: "",
        });
      } catch (err) {
        console.error("Error al cargar datos del estudiante:", err);
        toast.error("No se pudieron cargar los datos del estudiante");
        setData((prev) => ({
          ...prev,
          loading: false,
          error: "No se pudieron cargar los datos del estudiante.",
        }));
      }
    };

    if (token) fetchAll();
  }, [token]);

  return data;
}
