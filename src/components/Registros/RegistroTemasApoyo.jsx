import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useTemasApoyo from "../../hooks/useTemasApoyo";

export default function RegistroTemasApoyo() {
    const [cortesAcademicos, setCortesAcademicos] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        temas,
        createTema,
        updateTema,
        deleteTema,
        loading,
    } = useTemasApoyo();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://72.61.0.205:8000/api/academics/academic-cuts/", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                setCortesAcademicos(res.data);
                setLoadingLocal(false);
            })
            .catch(() => {
                setError("Error al cargar cortes académicos");
                setLoadingLocal(false);
            });
    }, []);

    const enriched = useMemo(() => {
        return temas.map((t) => {
            const corte = cortesAcademicos.find(c => c.academic_cut_id === t.academic_cut_id);

            return {
                ...t,
                nombre_corte: corte?.name ?? `ID ${t.academic_cut_id}`,
            };
        });
    }, [temas, cortesAcademicos]);

    const columns = [
        { key: "support_topic_id", label: "ID" },
        { key: "nombre_corte", label: "Corte Académico" },
        { key: "topic", label: "Tema" },
        { key: "description", label: "Descripción" },
        { key: "status", label: "Estado" },
    ];

    const fields = [
        { name: "academic_cut_id", label: "ID del corte académico", type: "number" },
        { name: "topic", label: "Tema", type: "text" },
        { name: "description", label: "Descripción", type: "textarea" },
        { name: "status", label: "Estado", type: "text" },
    ];

    return (
        <CrudTable
            title="Temas de Apoyo"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createTema}
            onUpdate={updateTema}
            onDelete={deleteTema}
            loading={loading || loadingLocal}
            error={error}
            searchKeys={["support_topic_id", "topic", "nombre_corte", "status"]}
            dateFilters={[]}
        />
    );
}
