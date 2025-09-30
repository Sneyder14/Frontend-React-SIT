import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/tutoring-participation/";

export default function useParticipacionTutoria() {
    const [participaciones, setParticipaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchParticipaciones = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setParticipaciones(res.data);
        } catch (err) {
            toast.error("Error al cargar participaciones");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createParticipacion = async (data) => {
        const cleanData = { ...data };
        delete cleanData.tutoring_participation_id;

        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Registrando participación...",
                success: "Participación registrada",
                error: "Error al registrar participación",
            }
        ).then((res) => {
            setParticipaciones((prev) => [...prev, res.data]);
        });
    };

    const updateParticipacion = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando participación...",
                success: "Participación actualizada",
                error: "Error al actualizar participación",
            }
        ).then((res) => {
            setParticipaciones((prev) =>
                prev.map((p) => (p.tutoring_participation_id === id ? res.data : p))
            );
        });
    };

    const deleteParticipacion = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando participación...",
                success: "Participación eliminada",
                error: "Error al eliminar participación",
            }
        ).then(() => {
            setParticipaciones((prev) =>
                prev.filter((p) => p.tutoring_participation_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchParticipaciones();
    }, []);

    return {
        participaciones,
        createParticipacion,
        updateParticipacion,
        deleteParticipacion,
        loading,
    };
}
