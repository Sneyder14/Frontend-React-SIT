export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6 font-bold text-indigo-600 text-xl">FlyonUI Admin</div>
                <nav className="px-4 space-y-2">
                    <NavLink to="/admin/registros" className="nav-item">📋 Registros</NavLink>
                    <NavLink to="/admin/cursos" className="nav-item">📚 Cursos</NavLink>
                    <NavLink to="/admin/estadisticas" className="nav-item">📊 Estadísticas</NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-800">Panel administrativo</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Admin</span>
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                            AS
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
