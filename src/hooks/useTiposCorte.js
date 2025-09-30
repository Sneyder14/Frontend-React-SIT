import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/cut-types/";

export default function useTiposCorte() {
    const [tiposCorte, setTiposCorte] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchTiposCorte = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTiposCorte(res.data);
        } catch (err) {
            toast.error("Error al cargar tipos de corte");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createTipoCorte = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando tipo de corte...",
                success: "Tipo de corte creado",
                error: "Error al crear tipo de corte",
            }
        ).then((res) => {
            setTiposCorte((prev) => [...prev, res.data]);
        });
    };

    const updateTipoCorte = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando tipo de corte...",
                success: "Tipo de corte actualizado",
                error: "Error al actualizar tipo de corte",
            }
        ).then((res) => {
            setTiposCorte((prev) =>
                prev.map((t) => (t.cut_type_id === id ? res.data : t))
            );
        });
    };

    const deleteTipoCorte = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando tipo de corte...",
                success: "Tipo de corte eliminado",
                error: "Error al eliminar tipo de corte",
            }
        ).then(() => {
            setTiposCorte((prev) => prev.filter((t) => t.cut_type_id !== id));
        });
    };

    useEffect(() => {
        fetchTiposCorte();
    }, []);

    return {
        tiposCorte,
        createTipoCorte,
        updateTipoCorte,
        deleteTipoCorte,
        loading,
    };
}
