import { Bell } from "lucide-react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useNotificaciones } from "../context/NotificacionesContext"

export default function Notificaciones() {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();
  const { notificaciones, marcarTodasComoLeidas } = useNotificaciones();

  const hayNuevas = notificaciones.some((n) => !n.leido);

  const togglePanel = () => {
    setAbierto(!abierto);
    marcarTodasComoLeidas();
  };

  const irANotificacion = (ruta) => {
    setAbierto(false);
    navigate(ruta);
  };

  return (
    <div className="relative">
      <button onClick={togglePanel} className="relative">
        <Bell
          size={28}
          className="text-gray-700 hover:text-[#101828] transition-all duration-300 ease-in-out cursor-pointer hover:scale-110"
        />
        {hayNuevas && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white animate-pulse" />
        )}
      </button>

      <Transition
        show={abierto}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b font-semibold text-gray-700">Notificaciones</div>
          <ul className="max-h-64 overflow-y-auto divide-y">
            {notificaciones.length === 0 ? (
              <li className="p-4 text-sm text-gray-500">Sin notificaciones nuevas</li>
            ) : (
              notificaciones.map((n) => (
                <li
                  key={n.id}
                  onClick={() => irANotificacion(n.ruta)}
                  className="p-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {n.mensaje}
                  <span className="block text-xs text-gray-400 mt-1">{formatearFecha(n.fecha)}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
