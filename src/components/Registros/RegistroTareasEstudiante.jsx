import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useTareasEstudiante from "../../hooks/useTareasEstudiante";

export default function RegistroTareasEstudiante() {
    const [usuarios, setUsuarios] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [tareasBase, setTareasBase] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [error, setError] = useState(null);

    const {
        tareas,
        createTarea,
        updateTarea,
        deleteTarea,
        loading,
    } = useTareasEstudiante();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchExtras = async () => {
            try {
                const [userRes, studentRes, taskRes] = await Promise.all([
                    axios.get("http://72.61.0.205:8000/api/auth/users/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/students/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://72.61.0.205:8000/api/academics/tasks/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setUsuarios(userRes.data);
                setEstudiantes(studentRes.data);
                setTareasBase(taskRes.data);
                setLoadingLocal(false);
            } catch (err) {
                setError("Error al cargar usuarios, estudiantes o tareas");
                setLoadingLocal(false);
            }
        };

        fetchExtras();
    }, []);

    const enriched = useMemo(() => {
        return tareas.map((r) => {
            const estudiante = estudiantes.find(e => e.student_id === r.students_student_id);
            const usuario = estudiante
                ? usuarios.find(u => u.id_user === estudiante.student_id && u.id_role === 1)
                : null;

            const tarea = tareasBase.find(t => t.task_id === r.task_task_id);

            return {
                ...r,
                nombre_estudiante: usuario
                    ? `${usuario.name} ${usuario.last_name}`
                    : `ID ${r.students_student_id}`,
                nombre_tarea: tarea?.name ?? `ID ${r.task_task_id}`,
            };
        });
    }, [tareas, usuarios, estudiantes, tareasBase]);

    const columns = [
        { key: "students_task_id", label: "ID" },
        { key: "nombre_estudiante", label: "Estudiante" },
        { key: "nombre_tarea", label: "Tarea" },
    ];

    const fields = [
        { name: "students_student_id", label: "ID del estudiante", type: "number" },
        { name: "task_task_id", label: "ID de la tarea", type: "number" },
    ];

    return (
        <CrudTable
            title="Tareas por Estudiante"
            data={enriched}
            columns={columns}
            fields={fields}
            onCreate={createTarea}
            onUpdate={updateTarea}
            onDelete={deleteTarea}
            loading={loading || loadingLocal}
            error={error}
            searchKeys={["students_task_id", "nombre_estudiante", "nombre_tarea"]}
        />
    );
}
