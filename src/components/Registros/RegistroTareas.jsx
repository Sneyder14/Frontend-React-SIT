import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useTareas from "../../hooks/useTareas";

export default function RegistroTareas() {
    const [courseTeachers, setCourseTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [cuts, setCuts] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [cutTypes, setCutTypes] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        tareas,
        createTarea,
        updateTarea,
        deleteTarea,
        loading,
    } = useTareas();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchExtras = async () => {
            try {
                const [ctRes, cRes, tRes, acRes, sRes, ctTypeRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/academics/course-teachers/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/courses/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/teachers/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/academic-cuts/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/semesters/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/cut-types/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setCourseTeachers(ctRes.data);
                setCourses(cRes.data);
                setTeachers(tRes.data);
                setCuts(acRes.data);
                setSemesters(sRes.data);
                setCutTypes(ctTypeRes.data);
                setLoadingLocal(false);
            } catch (err) {
                setError("Error al cargar datos relacionados");
                setLoadingLocal(false);
            }
        };

        fetchExtras();
    }, []);

    const enriched = useMemo(() => {
        return tareas.map((t) => {
            const ct = courseTeachers.find(c => c.course_teacher_id === t.course_teacher_id);
            const curso = courses.find(c => c.course_id === ct?.course_id);
            const docente = teachers.find(d => d.teacher_id === ct?.teacher_id);

            const corte = cuts.find(c => c.academic_cut_id === t.academic_cut_id);
            const semestre = semesters.find(s => s.semester_id === corte?.semester_id);
            const tipoCorte = cutTypes.find(ct => ct.cut_type_id === corte?.cut_type_id);

            return {
                ...t,
                docente_curso: `${curso?.name ?? "Curso"} - ${docente?.speciality ?? "Docente"}`,
                corte_academico: `${tipoCorte?.name ?? "Corte"} (${semestre?.semester_level ?? "Semestre"})`,
            };
        });
    }, [tareas, courseTeachers, courses, teachers, cuts, semesters, cutTypes]);

    const columns = [
        { key: "task_id", label: "ID" },
        { key: "docente_curso", label: "Docente en curso" },
        { key: "corte_academico", label: "Corte académico" },
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
        { key: "start_date", label: "Inicio" },
        { key: "end_date", label: "Fin" },
        { key: "status", label: "Estado" },
        { key: "percentage", label: "Porcentaje" },
    ];

    const fields = [
        { name: "course_teacher_id", label: "ID del docente en curso", type: "number" },
        { name: "academic_cut_id", label: "ID del corte académico", type: "number" },
        { name: "name", label: "Nombre", type: "text" },
        { name: "description", label: "Descripción", type: "textarea" },
        { name: "start_date", label: "Fecha de inicio", type: "datetime-local" },
        { name: "end_date", label: "Fecha de fin", type: "datetime-local" },
        { name: "status", label: "Estado", type: "text" },
        { name: "percentage", label: "Porcentaje", type: "text" },
    ];

    const renderCell = (key, value) => {
        if (key === "status") {
            const statusClass = {
                active: "bg-green-100 text-green-700",
                closed: "bg-gray-100 text-gray-700",
                pending: "bg-yellow-100 text-yellow-700",
            };
            const color = statusClass[value] || "bg-blue-100 text-blue-700";
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
            title="Tareas Académicas"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createTarea}
            onUpdate={updateTarea}
            onDelete={deleteTarea}
            loading={loading || loadingLocal}
            error={error}
            renderCell={renderCell}
            searchKeys={["task_id", "name", "docente_curso", "corte_academico", "status"]}
            dateFilters={["start_date", "end_date"]}
        />
    );
}
