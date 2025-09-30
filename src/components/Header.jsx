import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import UsuarioFoto from "./UsuarioFoto";
import Notificaciones from "./Nofificaciones";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="flex items-center bg-[#FFFFFF] p-4 justify-between shadow-md gap-4">
      <button
        className="text-gray-700 cursor-pointer md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="text-gray-500" size={28} />
      </button>

      <div className="flex items-center gap-5 w-full sm:flex-1 sm:justify-end md:justify-end transition-all duration-300">
        <SearchBar className="md:max-w-xl lg:max-w-lvw border-none outline-0" />
        <Notificaciones />
      </div>

      <div className="flex items-center justify-center border-l-1 border-gray-400 px-3">
        <UsuarioFoto className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-110" />
      </div>
    </header>
  );
}
