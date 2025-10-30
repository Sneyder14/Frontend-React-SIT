
export default function Calificaciones() {
  const datos = [
    { curso: "Matemáticas Discretas", nota: 4.5 },
    { curso: "Programación Web", nota: 4.2 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#665BF7] mb-4 text-items font-[roboto]">
        Mis Calificaciones
      </h2>
      <ul className="space-y-3 font-[roboto]">
        {datos.map((item, index) => (
          <li
            key={index}
            className="bg-white font-[roboto] rounded-lg shadow p-4 flex justify-between items-center"
          >
            <span className="font-medium text-gray-800 dark:text-white">
              {item.curso}
            </span>
            <span className="text-indigo-600 font-bold font-[roboto] text-lg">
              {item.nota}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
