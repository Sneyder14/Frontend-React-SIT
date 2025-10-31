import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useParticipacionTutoria from "../../hooks/useParticipacionTutoria";

export default function RegistroParticipacionTutoria() {
    const [usuarios, setUsuarios] = useState([]);
    const [cursoEstudiantes, setCursoEstudiantes] = useState([]);
    const [gruposTutoria, setGruposTutoria] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        participaciones,
        createParticipacion,
        updateParticipacion,
        deleteParticipacion,
        loading,
    } = useParticipacionTutoria();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchExtras = async () => {
            try {
                const [usuariosRes, cursoEstRes, gruposRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/auth/users/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/course-students/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/tutoring-groups/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setUsuarios(usuariosRes.data);
                setCursoEstudiantes(cursoEstRes.data);
                setGruposTutoria(gruposRes.data);
                setLoadingLocal(false);
            } catch (err) {
                setError("Error al cargar estudiantes o grupos de tutoría");
                setLoadingLocal(false);
            }
        };

        fetchExtras();
    }, []);

    const enriched = useMemo(() => {
        return participaciones.map((p) => {
            const cursoEst = cursoEstudiantes.find(c => c.course_student_id === p.course_student_id);
            const usuario = cursoEst
                ? usuarios.find(u => u.id_user === cursoEst.student_id && u.id_role === 1)
                : null;

            const grupo = gruposTutoria.find(g => g.tutoring_group_id === p.tutoring_group_id);

            return {
                ...p,
                nombre_estudiante: usuario
                    ? `${usuario.name} ${usuario.last_name}`
                    : ` ${p.course_student_id}`,
                nombre_grupo: grupo?.group_name ?? ` ${p.tutoring_group_id}`,
            };
        });
    }, [participaciones, cursoEstudiantes, usuarios, gruposTutoria]);

    const columns = [
        { key: "tutoring_participation_id", label: "ID" },
        { key: "nombre_grupo", label: "Grupo de tutoría" },
        { key: "nombre_estudiante", label: "Estudiante en curso" },
        { key: "enrollment_date", label: "Fecha de inscripción" },
        { key: "participation_status", label: "Estado de participación" },
    ];

    const fields = [
        { name: "tutoring_group_id", label: "ID del grupo de tutoría", type: "number" },
        { name: "course_student_id", label: "ID del estudiante en curso", type: "number" },
        { name: "enrollment_date", label: "Fecha de inscripción", type: "datetime-local" },
        { name: "participation_status", label: "Estado de participación", type: "text" },
    ];

    return (
        <CrudTable
            title="Participación en Tutoría"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createParticipacion}
            onUpdate={updateParticipacion}
            onDelete={deleteParticipacion}
            loading={loading || loadingLocal}
            error={error}
            searchKeys={["tutoring_participation_id", "nombre_estudiante", "nombre_grupo", "participation_status"]}
            dateFilters={["enrollment_date"]}
        />
    );
}
