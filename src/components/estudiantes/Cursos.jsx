import { BookOpen } from "lucide-react";
import useStudentData from "../../hooks/useStudentData";

export default function Cursos() {
    const { cursos, loading, error } = useStudentData();

    if (loading) return <div className="p-6 text-gray-800">Cargando cursos...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="h-full overflow-y-auto px-6 py-4">
            <div className="p-6 animate-fade font-[roboto]">
                <h2 className="text-xl  mb-6 uppercase font-bold font-[roboto] text-[#665BF7] text-center">Cursos inscritos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-[roboto]">
                    {cursos.map((curso) => (
                        <div
                            key={curso.course_id}
                            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                        >
                            <div className="relative">
                                <img
                                    src="/images/curso.jpg"
                                    alt="Curso"
                                    className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-indigo-700 bg-opacity-50 flex items-center justify-center text-white font-[roboto] text-xl font-bold">
                                    <BookOpen size={24} className="mr-2" />
                                    {curso.course_id}
                                </div>
                            </div>

                            <div className="p-4 space-y-2">
                                <p className="text-sm text-gray-600 font-[roboto]">
                                    <span className="font-semibold text-gray-800 font-[roboto]">Estado:</span>{" "}
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${curso.status === "activo"
                                        ? "bg-green-100 text-green-700"
                                        : curso.status === "pendiente"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}>
                                        {curso.status}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-gray-800 font-[roboto]">Fecha de inscripción:</span>{" "}
                                    {formatearFecha(curso.enrollment_date)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-gray-800">Nota final:</span>{" "}
                                    {curso.final_grade || "Sin nota aún"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}