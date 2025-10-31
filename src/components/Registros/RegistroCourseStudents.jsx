import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useCursoEstudiantes from "../../hooks/useCursosEstudiantes";

export default function RegistroCourseStudents() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoFiltro, setCursoFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  const {
    cursoEstudiantes,
    createCursoEstudiante,
    updateCursoEstudiante,
    deleteCursoEstudiante,
  } = useCursoEstudiantes();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [userRes, courseInfoRes, studentRes] = await Promise.all([
          axios.get("http://72.61.0.205:8000/api/auth/users/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://72.61.0.205:8000/api/academics/courses/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://72.61.0.205:8000/api/academics/students/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const cursos = courseInfoRes.data;
        const estudiantes = studentRes.data;

        const usuariosPlanos = userRes.data.flatMap(u =>
          Array.isArray(u.usuarios) ? [u, ...u.usuarios] : [u]
        );

        const estudiantesRol1 = usuariosPlanos.filter(u => u.id_role === 1);

        const enriched = cursoEstudiantes.map((r) => {
          const usuario = estudiantesRol1.find(u => u.id_user === r.student_id);
          const curso = cursos.find(c => c.course_id === r.course_id);
          const estudianteInfo = estudiantes.find(s => s.student_id === r.student_id);

          return {
            ...r,
            nombre_estudiante: usuario
              ? `${usuario.name ?? "Sin nombre"} ${usuario.last_name ?? ""}`
              : `ID ${r.student_id}`,
            nombre_curso: curso?.name ?? `Curso ${r.course_id}`,
            student_code: estudianteInfo?.student_code ?? "—",
          };
        });

        const enrichedFiltrado = enriched.filter(e =>
          e.nombre_estudiante &&
          !e.nombre_estudiante.startsWith("ID ") &&
          e.student_id !== null
        );

        setData(enrichedFiltrado);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos de estudiantes por curso");
        setLoading(false);
      }
    };

    fetchData();
  }, [cursoEstudiantes]);

  const cursosUnicos = useMemo(() => [...new Set(data.map(d => d.nombre_curso))], [data]);
  const estadosUnicos = useMemo(() => [...new Set(data.map(d => d.status))], [data]);

  useEffect(() => {
    const filtrado = data.filter(d =>
      (!cursoFiltro || d.nombre_curso === cursoFiltro) &&
      (!estadoFiltro || d.status === estadoFiltro)
    );
    setFilteredData(filtrado);
  }, [data, cursoFiltro, estadoFiltro]);

  const columns = [
    { key: "course_student_id", label: "ID" },
    { key: "nombre_curso", label: "Curso" },
    { key: "nombre_estudiante", label: "Estudiante" },
    { key: "student_code", label: "Código" },
    { key: "enrollment_date", label: "Fecha de inscripción" },
    { key: "final_grade", label: "Nota final" },
    { key: "status", label: "Estado" },
  ];

  const fields = [
    { name: "course_id", label: "ID del curso", type: "number" },
    { name: "student_id", label: "ID del estudiante", type: "number" },
    { name: "enrollment_date", label: "Fecha de inscripción", type: "datetime-local" },
    { name: "final_grade", label: "Nota final", type: "text" },
    { name: "status", label: "Estado", type: "text" },
  ];

  const renderCell = (key, value) => {
    if (key === "final_grade") {
      const nota = parseFloat(value);
      const color =
        nota < 3.0 ? "bg-red-100 text-red-700" :
          nota < 4.0 ? "bg-yellow-100 text-yellow-700" :
            "bg-green-100 text-green-700";

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
          {value}
        </span>
      );
    }

    if (key === "status") {
      const statusClass = {
        enrolled: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        dropped: "bg-red-100 text-red-700",
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
          className="border px-2 py-2 rounded w-full sm:w-auto"
          value={cursoFiltro}
          onChange={(e) => setCursoFiltro(e.target.value)}
        >
          <option value="">Todos los cursos</option>
          {cursosUnicos.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="border px-2 py-2 rounded w-full sm:w-auto"
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
        title="Estudiantes por Curso"
        data={filteredData}
        columns={columns}
        fields={fields}
        onCreate={createCursoEstudiante}
        onUpdate={updateCursoEstudiante}
        onDelete={deleteCursoEstudiante}
        loading={loading}
        error={error}
        renderCell={renderCell}
        searchKeys={["course_student_id", "nombre_curso", "nombre_estudiante", "student_code", "status"]}
        dateFilters={["enrollment_date"]}
      />
    </div>
  );
}
