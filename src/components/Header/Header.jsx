import { Menu } from "lucide-react";
import SearchBar from "../Header/SearchBar";
import Notificaciones from "../Nofificaciones";
import AvatarDropdown from "../Avatars/AvatarDropdown";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="flex items-center bg-[#FFFFFF] p-4 justify-between shadow-md gap-4 font-[roboto]">
      <button
        className="text-gray-700 cursor-pointer md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="text-gray-500" size={28} />
      </button>

      <div className="flex items-center gap-5 w-full sm:flex-1 sm:justify-end md:justify-end transition-all duration-300 font-[roboto]">
        <SearchBar className="md:max-w-xl lg:max-w-lvw border-none outline-0" />
        <Notificaciones />
      </div>

      <div className="flex items-center justify-center border-l-1 border-gray-400 px-3">
        <AvatarDropdown className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-110" />
      </div>
    </header>
  );
}
