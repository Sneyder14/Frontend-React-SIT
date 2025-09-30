import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/student-exercise-attempts/";

export default function useIntentosEjercicio() {
    const [intentos, setIntentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchIntentos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIntentos(res.data);
        } catch (err) {
            toast.error("Error al cargar intentos");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createIntento = async (data) => {
        const cleanData = { ...data };
        cleanData.student_exercise_attempt_id;

        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Registrando intento...",
                success: "Intento registrado",
                error: "Error al registrar intento",
            }
        ).then((res) => {
            setIntentos((prev) => [...prev, res.data]);
        });
    };

    const updateIntento = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando intento...",
                success: "Intento actualizado",
                error: "Error al actualizar intento",
            }
        ).then((res) => {
            setIntentos((prev) =>
                prev.map((i) => (i.student_exercise_attempt_id === id ? res.data : i))
            );
        });
    };

    const deleteIntento = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando intento...",
                success: "Intento eliminado",
                error: "Error al eliminar intento",
            }
        ).then(() => {
            setIntentos((prev) =>
                prev.filter((i) => i.student_exercise_attempt_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchIntentos();
    }, []);

    return {
        intentos,
        createIntento,
        updateIntento,
        deleteIntento,
        loading,
    };
}
