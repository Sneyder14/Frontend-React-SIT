import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api/academics/mslq-items/";

export default function useItemsMSLQ() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(res.data);
        } catch (err) {
            toast.error("Error al cargar ítems");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (data) => {
        const cleanData = {...data};
        delete cleanData.mslq_item_id;

        await toast.promise(
            axios.post(API_URL, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Creando ítem...",
                success: "Ítem creado",
                error: "Error al crear ítem",
            }
        ).then((res) => {
            setItems((prev) => [...prev, res.data]);
        });
    };

    const updateItem = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando ítem...",
                success: "Ítem actualizado",
                error: "Error al actualizar ítem",
            }
        ).then((res) => {
            setItems((prev) =>
                prev.map((i) => (i.mslq_item_id === id ? res.data : i))
            );
        });
    };

    const deleteItem = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando ítem...",
                success: "Ítem eliminado",
                error: "Error al eliminar ítem",
            }
        ).then(() => {
            setItems((prev) => prev.filter((i) => i.mslq_item_id !== id));
        });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return {
        items,
        createItem,
        updateItem,
        deleteItem,
        loading,
    };
}
