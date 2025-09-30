import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/classification-types/";

export default function useClasificaciones() {
    const [clasificaciones, setClasificaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchClasificaciones = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setClasificaciones(res.data);
        } catch (err) {
            toast.error("Error al cargar clasificaciones");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createClasificacion = async (data) => {
        const cleanData = { ...data };
        delete cleanData.type_id; // 

        console.log("Datos enviados:", cleanData); 

        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando clasificación...",
                success: "Clasificación creada",
                error: "Error al crear clasificación",
            }
        ).then((res) => {
            setClasificaciones((prev) => [...prev, res.data]);
        });
    };


    const updateClasificacion = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando clasificación...",
                success: "Clasificación actualizada",
                error: "Error al actualizar clasificación",
            }
        ).then((res) => {
            setClasificaciones((prev) =>
                prev.map((c) => (c.type_id === id ? res.data : c))
            );
        });
    };

    const deleteClasificacion = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando clasificación...",
                success: "Clasificación eliminada",
                error: "Error al eliminar clasificación",
            }
        ).then(() => {
            setClasificaciones((prev) => prev.filter((c) => c.type_id !== id));
        });
    };

    useEffect(() => {
        fetchClasificaciones();
    }, []);

    return {
        clasificaciones,
        createClasificacion,
        updateClasificacion,
        deleteClasificacion,
        loading,
    };
}
