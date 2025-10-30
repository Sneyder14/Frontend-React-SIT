import useStudentData from "../../hooks/useStudentData";
import { BookOpenCheck, AlertCircle } from "lucide-react";

export default function EjerciciosDeApoyo() {
    const { ejercicios, loading, error } = useStudentData();

    if (loading)
        return <div className="p-6 text-gray-500">Cargando ejercicios...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="h-full overflow-y-auto px-6 py-4 font-[roboto]">
            <div className="px-6 py-4 animate-fade">
                <h2 className="text-xl mb-6 flex items-center justify-center gap-2 uppercase font-bold font-[roboto] text-[#665BF7] text-center">
                    <BookOpenCheck size={20} />
                    Ejercicios de Apoyo
                </h2>

                {ejercicios.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <AlertCircle size={20} className="inline-block mr-2" />
                        No tienes ejercicios asignados por ahora.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ejercicios.map((ej, index) => (
                            <div
                                key={`${ej.assignment_id}-${index}`}
                                className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {ej.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">{ej.statement}</p>

                                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                    <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                                        Dificultad: {ej.difficulty_level}
                                    </span>
                                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-900">
                                        Intentos: {ej.number_of_tries}
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full font-medium ${ej.status === "completado"
                                                ? "bg-green-100 text-green-700"
                                                : ej.status === "pendiente"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {ej.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
