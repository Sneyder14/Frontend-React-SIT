import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/item-headers/";

export default function useEncabezadosMSLQ() {
    const [encabezados, setEncabezados] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchEncabezados = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEncabezados(res.data);
        } catch (err) {
            toast.error("Error al cargar encabezados");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createEncabezado = async (data) => {
        const cleanData = { ...data };
        delete cleanData.item_header_id; 

        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando encabezado...",
                success: "Encabezado creado",
                error: "Error al crear encabezado",
            }
        ).then((res) => {
            setEncabezados((prev) => [...prev, res.data]);
        });
    };



    const updateEncabezado = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando encabezado...",
                success: "Encabezado actualizado",
                error: "Error al actualizar encabezado",
            }
        ).then((res) => {
            setEncabezados((prev) =>
                prev.map((e) => (e.item_header_id === id ? res.data : e))
            );
        });
    };

    const deleteEncabezado = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando encabezado...",
                success: "Encabezado eliminado",
                error: "Error al eliminar encabezado",
            }
        ).then(() => {
            setEncabezados((prev) =>
                prev.filter((e) => e.item_header_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchEncabezados();
    }, []);

    return {
        encabezados,
        createEncabezado,
        updateEncabezado,
        deleteEncabezado,
        loading,
    };
}
