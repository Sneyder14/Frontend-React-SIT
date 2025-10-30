import { Search } from "lucide-react";

export default function SearchBar({ className = "" }) {
    return (
        <div className={`relative w-full max-w-md ${className}`}>
            {/* Ícono de búsqueda */}
            <Search className="absolute left-3 top-2.5 text-[#101828]" size={20} />

            <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 text-sm text-[#101828] border-none outline-none transition-all duration-300 
                focus:ring-0 ease-in-out font-[roboto]"
            />
        </div>
    );
};
