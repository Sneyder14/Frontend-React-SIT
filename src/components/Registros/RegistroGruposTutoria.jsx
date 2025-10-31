import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useGruposTutoria from "../../hooks/useGruposTutoria";

function formatHourTo12(hora) {
    if (!hora) return "";
    const [hour, minute] = hora.slice(0, 5).split(":");
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12 + 1);
    return `${hour12}:${minute} ${suffix}`;
}

export default function RegistroGruposTutoria() {
    const [temasTutoria, setTemasTutoria] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        grupos,
        createGrupo,
        updateGrupo,
        deleteGrupo,
        loading,
    } = useGruposTutoria();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://72.61.0.205:8000/api/academics/tutoring-topics/", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                setTemasTutoria(res.data);
                setLoadingLocal(false);
            })
            .catch(() => {
                setError("Error al cargar temas de tutoría");
                setLoadingLocal(false);
            });
    }, []);

    const enriched = useMemo(() => {
        return grupos.map((g) => {
            const tema = temasTutoria.find(t => t.tutoring_topic_id === g.tutoring_topic_id);

            return {
                ...g,
                nombre_tema: tema?.topic ?? `ID ${g.tutoring_topic_id}`,
            };
        });
    }, [grupos, temasTutoria]);

    const columns = [
        { key: "tutoring_group_id", label: "ID" },
        { key: "course_teacher_id", label: "Docente en curso" },
        { key: "nombre_tema", label: "Tema de tutoría" },
        { key: "tutoring_date", label: "Fecha de tutoría" },
        { key: "tutoring_hour", label: "Hora", render: (value) => formatHourTo12(value) },
        { key: "tutoring_site", label: "Lugar" },
        { key: "tutoring_message", label: "Mensaje" },
        { key: "date", label: "Fecha de registro" },
        { key: "status", label: "Estado" },
    ];

    const fields = [
        { name: "course_teacher_id", label: "ID del docente en curso", type: "number" },
        { name: "tutoring_topic_id", label: "ID del tema de tutoría", type: "number" },
        { name: "tutoring_date", label: "Fecha de tutoría", type: "date" },
        { name: "tutoring_hour", label: "Hora", type: "time" },
        { name: "tutoring_site", label: "Lugar", type: "text" },
        { name: "tutoring_message", label: "Mensaje", type: "textarea" },
        { name: "date", label: "Fecha de registro", type: "date" },
        { name: "status", label: "Estado", type: "text" },
    ];

    return (
        <CrudTable
            title="Grupos de Tutoría"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createGrupo}
            onUpdate={updateGrupo}
            onDelete={deleteGrupo}
            loading={loading || loadingLocal}
            error={error}
            searchKeys={["tutoring_group_id", "nombre_tema", "tutoring_site", "status"]}
            dateFilters={["tutoring_date", "date"]}
        />
    );
}
