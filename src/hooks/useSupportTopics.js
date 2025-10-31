import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function useSupportTopics() {
    const [temas, setTemas] = useState([]);
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

        const fetchTemas = async () => {
            try {
                const res = await axios.get("http://72.61.0.205:8000/api/academics/tutoring-topics/", { headers });
                const data = Array.isArray(res.data) ? res.data : [];

                const temasFiltrados = data.filter(t => t.student_id === studentId);

                const temasEnriquecidos = temasFiltrados.map((t, index) => ({
                    topic: t.topic || `Tema ${index + 1}`,
                    description: t.description || "Sin descripción",
                    status: t.status || "pendiente",
                }));

                setTemas(temasEnriquecidos);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar temas de tutoría:", err);
                setError("No se pudieron cargar los temas.");
                setLoading(false);
            }
        };

        fetchTemas();
    }, [studentId]);

    return { temas, loading, error };
}
