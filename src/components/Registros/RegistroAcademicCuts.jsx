import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useCortes from "../../hooks/useCortes";

export default function RegistroAcademicCuts() {
    const [semestres, setSemestres] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        cortes,
        createCorte,
        updateCorte,
        deleteCorte,
        loading,
    } = useCortes();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchSemestres = async () => {
            try {
                const res = await axios.get("http://72.61.0.205:8000/api/academics/semesters/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSemestres(res.data);
                setLoadingLocal(false);
            } catch (err) {
                setError("Error al cargar los semestres");
                setLoadingLocal(false);
            }
        };

        fetchSemestres();
    }, []);

    const enriched = useMemo(() => {
        return cortes.map((corte) => {
            const semestre = semestres.find(s => s.semester_id === corte.semester_id);
            return {
                ...corte,
                nivel_semestre: semestre?.semester_level ?? `ID ${corte.semester_id}`,
            };
        });
    }, [cortes, semestres]);

    const columns = [
        { key: "academic_cut_id", label: "ID" },
        { key: "nivel_semestre", label: "Semestre" },
        { key: "start_date", label: "Inicio" },
        { key: "end_date", label: "Fin" },
        { key: "status", label: "Estado" },
        { key: "cut_type_id", label: "Tipo de corte" },
    ];

    const fields = [
        { name: "semester_id", label: "ID del semestre", type: "number" },
        { name: "start_date", label: "Fecha de inicio", type: "date" },
        { name: "end_date", label: "Fecha de fin", type: "date" },
        { name: "status", label: "Estado", type: "text" },
        { name: "cut_type_id", label: "ID del tipo de corte", type: "number" },
    ];

    const renderCell = (key, value) => {
        if (key === "status") {
            const statusClass = {
                active: "bg-green-100 text-green-700",
                inactive: "bg-red-100 text-red-700",
                pending: "bg-yellow-100 text-yellow-700",
            };
            const color = statusClass[value] || "bg-gray-100 text-gray-700";
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
                    {value}
                </span>
            );
        }
        return value;
    };

    return (
        <CrudTable
            title="Cortes Académicos"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createCorte}
            onUpdate={updateCorte}
            onDelete={deleteCorte}
            loading={loading || loadingLocal}
            error={error}
            renderCell={renderCell}
            searchKeys={["academic_cut_id", "nivel_semestre", "status"]}
        />
    );
}
