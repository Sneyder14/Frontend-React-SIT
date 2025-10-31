import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CrudTable from "../crud/CrudTable";
import useRespuestasMSLQ from "../../hooks/useRespuestaDetallesMSLQ";

export default function RegistroRespuestasMSLQ() {
  const [itemsMSLQ, setItemsMSLQ] = useState([]);
  const [respuestasMSLQ, setRespuestasMSLQ] = useState([]);
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
        const [itemsRes, respuestasRes] = await Promise.all([
          axios.get("http://72.61.0.205:8000/api/academics/mslq-items/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://72.61.0.205:8000/api/academics/mslq-responses/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setItemsMSLQ(itemsRes.data);
        setRespuestasMSLQ(respuestasRes.data);
        setLoadingLocal(false);
      } catch (err) {
        setError("Error al cargar ítems o respuestas MSLQ");
        setLoadingLocal(false);
      }
    };

    fetchExtras();
  }, []);

  const enriched = useMemo(() => {
    return respuestas.map((r) => {
      const item = itemsMSLQ.find(i => i.mslq_item_id === r.mslq_item_id);
      const respuesta = respuestasMSLQ.find(res => res.mslq_response_id === r.mslq_response_id);

      const total = parseFloat(respuesta?.total_score ?? "0");
      const score = parseFloat(r.score ?? "0");
      const porcentaje = total > 0 ? ((score / total) * 100).toFixed(2) + "%" : "—";

      return {
        ...r,
        texto_item: item?.item_text ?? `Ítem ${r.mslq_item_id}`,
        puntaje_total: respuesta?.total_score ?? "—",
        porcentaje,
      };
    });
  }, [respuestas, itemsMSLQ, respuestasMSLQ]);

  const columns = [
    { key: "item_response_detail_id", label: "ID" },
    { key: "mslq_response_id", label: "Respuesta MSLQ" },
    { key: "texto_item", label: "Ítem MSLQ" },
    { key: "response_date", label: "Fecha de respuesta" },
    { key: "score", label: "Puntaje" },
    { key: "porcentaje", label: "Porcentaje" },
    { key: "status", label: "Estado" },
  ];

  const fields = [
    { name: "mslq_response_id", label: "ID de respuesta MSLQ", type: "number" },
    { name: "mslq_item_id", label: "ID del ítem MSLQ", type: "number" },
    { name: "response_date", label: "Fecha de respuesta", type: "datetime-local" },
    { name: "score", label: "Puntaje", type: "number" },
    { name: "status", label: "Estado", type: "text" },
  ];

  return (
    <CrudTable
      title="Detalles de Respuestas MSLQ"
      data={enriched}
      columns={columns}
      fields={fields}
      onCreate={createRespuesta}
      onUpdate={updateRespuesta}
      onDelete={deleteRespuesta}
      loading={loading || loadingLocal}
      error={error}
      searchKeys={["item_response_detail_id", "mslq_response_id", "texto_item", "porcentaje", "status"]}
      dateFilters={["response_date"]}
    />
  );
}
