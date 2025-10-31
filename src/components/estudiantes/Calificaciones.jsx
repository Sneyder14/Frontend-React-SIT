import useStudentGrades from "../../hooks/useStudentGrades";

export default function Calificaciones() {
  const { calificaciones, loading, error } = useStudentGrades();

  if (loading) return <div className="p-6 text-gray-800">Cargando calificaciones...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#665BF7] mb-4 font-[roboto] text-center">
        Mis Calificaciones
      </h2>
      <ul className="space-y-4 font-[roboto]">
        {calificaciones.map((item, index) => (
          <li
            key={index}
            className="bg-white rounded-lg shadow p-4 space-y-1"
          >
            <p className="text-gray-800 font-semibold text-lg">
              {item.tarea}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Estado:</span> {item.estado}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Entrega:</span>{" "}
              {item.entrega ? formatearFecha(item.entrega) : "Sin fecha"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Resultados:</span>{" "}
              {item.resultados || "Sin observaciones"}
            </p>
            <p className="text-indigo-600 font-bold text-lg">
              Nota: {item.nota}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return isNaN(fecha.getTime())
    ? "Fecha inválida"
    : fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
}
