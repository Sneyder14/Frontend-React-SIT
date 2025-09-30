import { useAuth } from "../context/AuthContext";

export default function UsuarioFoto({ className = "" }) {
  const { user } = useAuth();
  console.log("Usuario en contexto:", user);

  let contenido;

  if (!user || !user.name || !user.last_name) {
    // Fallback visual si no hay datos
    contenido = (
      <span className="text-xl">👤</span> // Puedes cambiar por un ícono SVG o loader si prefieres
    );
  } else {
    const nombre = user.name.trim();
    const apellidoCompleto = user.last_name.trim();
    const primerApellido = apellidoCompleto.split(" ")[0];

    const iniciales =
      nombre[0] && primerApellido[0]
        ? `${nombre[0]}${primerApellido[0]}`.toUpperCase()
        : "👤";

    contenido = <span>{iniciales}</span>;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
        {contenido}
      </div>
    </div>
  );
}
