import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useRespuestasMSLQ from "../../hooks/useRespuestaMSLQ";

export default function RegistroRespuestasMSLQ() {
    const [usuarios, setUsuarios] = useState([]);
    const [cursoEstudiantes, setCursoEstudiantes] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        respuestas,
        createRespuesta,
        updateRespuesta,
        deleteRespuesta,
        loading,
    } = useRespuestasMSLQ();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchExtras = async () => {
            try {
                const [userRes, cursoEstRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/auth/users/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/course-students/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setUsuarios(userRes.data);
                setCursoEstudiantes(cursoEstRes.data);
                setLoadingLocal(false);
            } catch (err) {
                setError("Error al cargar usuarios o estudiantes en curso");
                setLoadingLocal(false);
            }
        };

        fetchExtras();
    }, []);

    const enriched = useMemo(() => {
        return respuestas.map((r) => {
            const cursoEst = cursoEstudiantes.find(c => c.course_student_id === r.course_student_id);
            const usuario = cursoEst
                ? usuarios.find(u => u.id_user === cursoEst.student_id && u.id_role === 1)
                : null;

            return {
                ...r,
                nombre_estudiante: usuario
                    ? `${usuario.name} ${usuario.last_name}`
                    : `ID ${r.course_student_id}`,
            };
        });
    }, [respuestas, cursoEstudiantes, usuarios]);

    const columns = [
        { key: "mslq_response_id", label: "ID" },
        { key: "nombre_estudiante", label: "Estudiante" },
        { key: "total_score", label: "Puntaje total" },
        { key: "response_date", label: "Fecha de respuesta" },
        { key: "status", label: "Estado" },
    ];

    const fields = [
        { name: "course_student_id", label: "ID del estudiante en curso", type: "number" },
        { name: "total_score", label: "Puntaje total", type: "text" },
        { name: "response_date", label: "Fecha de respuesta", type: "datetime-local" },
        { name: "status", label: "Estado", type: "text" },
    ];

    return (
        <CrudTable
            title="Respuestas MSLQ"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createRespuesta}
            onUpdate={updateRespuesta}
            onDelete={deleteRespuesta}
            loading={loading || loadingLocal}
            error={error}
            searchKeys={["mslq_response_id", "nombre_estudiante", "status"]}
            dateFilters={["response_date"]}
        />
    );
}
