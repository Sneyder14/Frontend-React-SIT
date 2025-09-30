import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/item-response-details/";


export default function useRespuestasMSLQ() {
    const [respuestas, setRespuestas] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchRespuestas = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRespuestas(res.data);
        } catch (err) {
            toast.error("Error al cargar respuestas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createRespuesta = async (data) => {
        const cleanData = {...data};
        delete cleanData.item_response_detail_id;
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Registrando respuesta...",
                success: "Respuesta registrada",
                error: "Error al registrar respuesta",
            }
        ).then((res) => {
            setRespuestas((prev) => [...prev, res.data]);
        });
    };

    const updateRespuesta = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando respuesta...",
                success: "Respuesta actualizada",
                error: "Error al actualizar respuesta",
            }
        ).then((res) => {
            setRespuestas((prev) =>
                prev.map((r) => (r.item_response_detail_id === id ? res.data : r))
            );
        });
    };

    const deleteRespuesta = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando respuesta...",
                success: "Respuesta eliminada",
                error: "Error al eliminar respuesta",
            }
        ).then(() => {
            setRespuestas((prev) =>
                prev.filter((r) => r.item_response_detail_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchRespuestas();
    }, []);

    return {
        respuestas,
        createRespuesta,
        updateRespuesta,
        deleteRespuesta,
        loading,
    };
}
