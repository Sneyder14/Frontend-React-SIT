import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import {
    FiUser,
    FiBookOpen,
    FiClipboard,
    FiCalendar,
    FiCheckCircle,
    FiAlertCircle,
    FiPercent,
    FiInfo,
} from "react-icons/fi";

export default function TablaInteractiva({ columns, data, titulo }) {
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: filter,
            sorting,
        },
        onGlobalFilterChange: setFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="bg-white shadow-xl rounded-xl p-6 font-sans w-full">
            <h2 className="text-xl font-bold text-[#665BF7] mb-4 tracking-tight uppercase font-[roboto] text-center">
                {titulo}
            </h2>

            <input
                type="text"
                placeholder="Buscar..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-[roboto]"
            />

            <div className="w-full overflow-x-auto rounded-md font-[roboto]">
                <table className="min-w-full text-sm text-black">
                    <thead className="bg-[#665BF7] text-white text-sm font-semibold sticky top-0 z-10 shadow-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-6 py-3 text-left cursor-pointer select-none transition whitespace-nowrap"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && <span className="ml-1">↑</span>}
                                        {header.column.getIsSorted() === "desc" && <span className="ml-1">↓</span>}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <Transition
                                key={row.id}
                                as="tr"
                                show={true}
                                appear
                                enter="transition-opacity duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                className="even:bg-white odd:bg-gray-50 hover:bg-indigo-100 transition-transform cursor-pointer"
                                onClick={() => {
                                    setFilaSeleccionada(row.original);
                                    setModalAbierto(true);
                                }}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const columnId = cell.column.id;
                                    const value = cell.getValue();
                                    const isDescripcion = columnId.toLowerCase().includes("descripcion");
                                    const texto =
                                        typeof value === "string" && isDescripcion && value.length > 5
                                            ? value.slice(0, 5) + "..."
                                            : value;

                                    return (
                                        <td key={cell.id} className="px-6 py-3 text-gray-700 whitespace-nowrap">
                                            {texto}
                                        </td>
                                    );
                                })}
                            </Transition>
                        ))}
                    </tbody>
                </table>
            </div>

            
            {modalAbierto && filaSeleccionada && (
                <div className="fixed inset-0 bg-black/75 bg-opacity-50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md font-[roboto]">
                        <h3 className="text-lg font-bold text-[#101828] mb-4 flex items-center gap-2">
                            <FiInfo /> Detalles del registro
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {columns.map((col) => {
                                const key = col.accessorKey;
                                const label = col.header;
                                const value = filaSeleccionada[key];
                                const icon = getIconForKey(key);
                                return (
                                    <li key={key} className="flex items-center gap-2">
                                        <span className="text-indigo-600">{icon}</span>
                                        <strong className="capitalize">{label}:</strong> {String(value)}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setModalAbierto(false)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Íconos adaptativos por campo
function getIconForKey(key) {
    switch (key.toLowerCase()) {
        case "nombre":
        case "usuario":
        case "estudiante":
            return <FiUser />;
        case "curso":
        case "course_id":
            return <FiBookOpen />;
        case "tarea":
        case "actividad":
        case "titulo":
            return <FiClipboard />;
        case "fecha":
        case "vencimiento":
            return <FiCalendar />;
        case "status":
            return <FiCheckCircle />;
        case "percentage":
        case "avance":
            return <FiPercent />;
        default:
            return <FiInfo />;
    }
}
