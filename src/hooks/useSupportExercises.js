import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function useSupportExercises() {
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const studentId = user?.id_user;

  useEffect(() => {
    if (!studentId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token no encontrado.");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchEjercicios = async () => {
      try {
        const res = await axios.get("http://72.61.0.205:8000/api/academics/support-exercises/", { headers });
        const data = Array.isArray(res.data) ? res.data : [];

        const ejerciciosFiltrados = data.filter(ej => ej.student_id === studentId);

        const ejerciciosEnriquecidos = ejerciciosFiltrados.map((ej, index) => ({
          assignment_id: ej.assignment_id || `ej-${index}`,
          title: ej.title || `Ejercicio ${index + 1}`,
          statement: ej.statement || "Sin enunciado",
          difficulty_level: ej.difficulty_level || "media",
          number_of_tries: ej.number_of_tries ?? 0,
          status: ej.status || "pendiente",
        }));

        setEjercicios(ejerciciosEnriquecidos);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar ejercicios de apoyo:", err);
        setError("No se pudieron cargar los ejercicios.");
        setLoading(false);
      }
    };

    fetchEjercicios();
  }, [studentId]);

  return { ejercicios, loading, error };
}
