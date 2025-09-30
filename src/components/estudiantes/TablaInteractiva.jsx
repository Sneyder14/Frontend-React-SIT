import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export default function TablaInteractiva({ columns, data, titulo }) {
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState([]);

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

        <div className="bg- shadow-xl rounded-xl p-6 font-sans w-full">
            <h2 className="text-xl font-bold text-[#101828] mb-4 tracking-tight uppercase font-[poppins] text-center">{titulo}</h2>

            <input
                type="text"
                placeholder="Buscar..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="w-full max-h-[calc(100vh-200px)] overflow-auto rounded-md font-[poppins]">
                <table className="w-full min-w-[700px] text-sm text-black ">
                    <thead className="bg-[#101828] text-white text-sm font-semibold sticky top-0 z-10 shadow-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-6 py-3 text-left cursor-pointer select-none hover:text-indigo-400 transition whitespace-nowrap"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && (
                                            <span className="text-xs text-gray-900 ml-1">↑</span>
                                        )}
                                        {header.column.getIsSorted() === "desc" && (
                                            <span className="text-xs text-gray-900 ml-1">↓</span>
                                        )}
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
                                className="even:bg-white odd:bg-gray-50 hover:bg-indigo-100 transition-transform"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const columnId = cell.column.id;
                                    const value = cell.getValue();

                                    if (columnId === "status") {
                                        return (
                                            <td key={cell.id} className="px-6 py-3 text-gray-700 tracking-tight whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${value === "completed" ? "bg-green-100 text-green-700" :
                                                    value === "pending" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-red-100 text-red-700"
                                                    }`}>
                                                    {value}
                                                </span>
                                            </td>
                                        );
                                    }

                                    if (columnId === "percentage") {
                                        return (
                                            <td key={cell.id} className="px-6 py-3 w-40 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                                                        style={{ width: `${parseFloat(value)}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-800 mt-1">{value}%</p>
                                            </td>
                                        );
                                    }

                                    return (
                                        <td key={cell.id} className="px-6 py-3 text-gray-700 tracking-tight whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                })}
                            </Transition>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
