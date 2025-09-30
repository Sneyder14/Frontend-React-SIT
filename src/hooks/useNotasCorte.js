import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/academic-cut-grades/";

export default function useNotasCorte() {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchNotas = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotas(res.data);
        } catch (err) {
            toast.error("Error al cargar notas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createNota = async (data) => {
        const cleanData = { ...data };
        delete cleanData.academic_cut_grade_id; 

        console.log("Datos enviados:", cleanData); 
        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando nota...",
                success: "Nota creada",
                error: "Error al crear nota",
            }
        ).then((res) => {
            setNotas((prev) => [...prev, res.data]);
        });
    };


    const updateNota = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando nota...",
                success: "Nota actualizada",
                error: "Error al actualizar nota",
            }
        ).then((res) => {
            setNotas((prev) =>
                prev.map((n) => (n.academic_cut_grade_id === id ? res.data : n))
            );
        });
    };

    const deleteNota = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando nota...",
                success: "Nota eliminada",
                error: "Error al eliminar nota",
            }
        ).then(() => {
            setNotas((prev) => prev.filter((n) => n.academic_cut_grade_id !== id));
        });
    };

    useEffect(() => {
        fetchNotas();
    }, []);

    return {
        notas,
        createNota,
        updateNota,
        deleteNota,
        loading,
    };
}
