import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useNotasCorte from "../../hooks/useNotasCorte";

export default function RegistroCutGrades() {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [error, setError] = useState(null);

  const {
    notas,
    createNota,
    updateNota,
    deleteNota,
    loading,
  } = useNotasCorte();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://72.61.0.205:8000/api/auth/users/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUsuarios(res.data);
        setLoadingLocal(false);
      })
      .catch(() => {
        setError("Error al cargar usuarios");
        setLoadingLocal(false);
      });
  }, []);

  const enriched = useMemo(() => {
    return notas.map((r) => {
      const usuario = usuarios.find(u => u.id_user === r.student_id && u.id_role === 1);

      return {
        ...r,
        nombre_estudiante: usuario
          ? `${usuario.name} ${usuario.last_name}`
          : `ID ${r.student_id}`,
      };
    });
  }, [notas, usuarios]);

  const columns = [
    { key: "academic_cut_grade_id", label: "ID" },
    { key: "nombre_estudiante", label: "Estudiante" },
    { key: "academic_cut_id", label: "Corte" },
    { key: "delivery_time", label: "Entrega" },
    { key: "grade", label: "Nota" },
    { key: "status", label: "Estado" },
  ];

  const fields = [
    { name: "student_id", label: "ID del estudiante", type: "number" },
    { name: "academic_cut_id", label: "ID del corte", type: "number" },
    { name: "delivery_time", label: "Fecha de entrega", type: "datetime-local" },
    { name: "grade", label: "Nota", type: "number", step: "0.1", min: 0, max: 5 },
    { name: "status", label: "Estado", type: "text" },
  ];

  return (
    <CrudTable
      title="Notas por Corte"
      data={enriched}
      columns={columns}
      fields={fields}
      onCreate={createNota}
      onUpdate={updateNota}
      onDelete={deleteNota}
      loading={loading || loadingLocal}
      error={error}
      searchKeys={["academic_cut_grade_id", "nombre_estudiante", "grade", "status"]}
      dateFilters={["delivery_time"]}
    />
  );
}
