import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/academics/academic-cuts/";

export default function useCortes() {
    const [cortes, setCortes] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [cutTypes, setCutTypes] = useState([]);
   
    const fetchCortes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCortes(response.data);
        } catch (err) {
            toast.error("Error al cargar cortes");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createCorte = async (data) => {
        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando corte...",
                success: "Corte creado",
                error: "Error al crear corte",
            }
        ).then((res) => {
            setCortes((prev) => [...prev, res.data]);
        });
    };

    const updateCorte = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando corte...",
                success: "Corte actualizado",
                error: "Error al actualizar corte",
            }
        ).then((res) => {
            setCortes((prev) =>
                prev.map((c) => (c.academic_cut_id === id ? res.data : c))
            );
        });
    };

    const deleteCorte = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando corte...",
                success: "Corte eliminado",
                error: "Error al eliminar corte",
            }
        ).then(() => {
            setCortes((prev) => prev.filter((c) => c.academic_cut_id !== id));
        });
    };

    useEffect(() => {
        fetchCortes();
    }, []);

    return {
        cortes,
        createCorte,
        updateCorte,
        deleteCorte,
        loading,
    };
}
