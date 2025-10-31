import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useCursoDocentes from "../../hooks/useCursoDocentes";

export default function RegistroCourseTeachers() {
    const [filteredData, setFilteredData] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [cursoFiltro, setCursoFiltro] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        cursoDocentes,
        createCursoDocente,
        updateCursoDocente,
        deleteCursoDocente,
        loading,
    } = useCursoDocentes();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchExtras = async () => {
            try {
                const [cursoRes, profRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/academics/courses/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/teachers/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setCursos(cursoRes.data);
                setProfesores(profRes.data);
                setLoadingLocal(false);
            } catch (err) {
                setError("Error al cargar cursos o profesores");
                setLoadingLocal(false);
            }
        };

        fetchExtras();
    }, []);

    const enriched = useMemo(() => {
        return cursoDocentes.map((r) => {
            const curso = cursos.find(c => c.course_id === r.course_id);
            const profe = profesores.find(p => p.teacher_id === r.teacher_id);

            return {
                ...r,
                nombre_curso: curso?.name ?? `Curso ${r.course_id}`,
                especialidad_docente: profe?.speciality ?? `ID ${r.teacher_id}`,
            };
        });
    }, [cursoDocentes, cursos, profesores]);

    useEffect(() => {
        const filtrado = enriched.filter(d =>
            (!cursoFiltro || d.nombre_curso === cursoFiltro) &&
            (!estadoFiltro || d.status === estadoFiltro)
        );
        setFilteredData(filtrado);
    }, [enriched, cursoFiltro, estadoFiltro]);

    const cursosUnicos = useMemo(() => [...new Set(enriched.map(d => d.nombre_curso))], [enriched]);
    const estadosUnicos = useMemo(() => [...new Set(enriched.map(d => d.status))], [enriched]);

    const columns = [
        { key: "course_teacher_id", label: "ID" },
        { key: "nombre_curso", label: "Curso" },
        { key: "especialidad_docente", label: "Especialidad" },
        { key: "assignment_date", label: "Fecha de asignación" },
        { key: "status", label: "Estado" },
    ];

    const fields = [
        { name: "course_id", label: "ID del curso", type: "number" },
        { name: "teacher_id", label: "ID del docente", type: "number" },
        { name: "assignment_date", label: "Fecha de asignación", type: "datetime-local" },
        { name: "status", label: "Estado", type: "text" },
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
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                <select
                    className="border px-3 py-2 rounded shadow-sm text-sm w-full sm:w-auto focus:outline-none focus:ring focus:border-blue-300"
                    value={cursoFiltro}
                    onChange={(e) => setCursoFiltro(e.target.value)}
                >
                    <option value="">Todos los cursos</option>
                    {cursosUnicos.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>

                <select
                    className="border px-3 py-2 rounded shadow-sm text-sm w-full sm:w-auto focus:outline-none focus:ring focus:border-blue-300"
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                >
                    <option value="">Todos los estados</option>
                    {estadosUnicos.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <CrudTable
                title="Docentes por Curso"
                data={filteredData}
                columns={columns}
                fields={fields}
                onCreate={createCursoDocente}
                onUpdate={updateCursoDocente}
                onDelete={deleteCursoDocente}
                loading={loading || loadingLocal}
                error={error}
                renderCell={renderCell}
                searchKeys={["course_teacher_id", "nombre_curso", "especialidad_docente", "status"]}
                dateFilters={["assignment_date"]}
            />
        </div>
    );
}
