export default function DashboardAdmin() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <Card title="Usuarios registrados" value="128" />
            <Card title="Cursos activos" value="24" />
            <Card title="Inscripciones hoy" value="9" />
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-indigo-600 text-2xl font-bold">{value}</p>
        </div>
    );
}
