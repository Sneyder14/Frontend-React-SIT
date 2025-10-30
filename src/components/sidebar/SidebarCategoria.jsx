import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import SiderLink from "./SiderLink";

export default function SidebarCategoria({
    icon: Icon,
    label,
    vista,
    items,
    expanded,
    vistaActual,
    setVistaActual,
    setSidebarOpen,
    solo = false,
}) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (solo && vista) {
            setVistaActual(vista);
            setSidebarOpen(false);
        } else {
            setOpen(!open);
        }
    };

    return (
        <div className="space-y-1">
            <button
                onClick={handleClick}
                className={`flex items-center justify-between w-full rounded-lg px-3 py-2 hover:bg-[#685CFE] text-[#FCFCEF] transition-all duration-200
          ${expanded ? "justify-between" : "justify-center"}`}
                title={label}
            >
                <div className={`flex items-center gap-3 ${expanded ? "w-full" : ""}`}>
                    <Icon size={22} />
                    <span
                        className={`transition-all duration-200 whitespace-nowrap ${expanded ? "opacity-100 ml-1" : "opacity-0 w-0"
                            }`}
                    >
                        {label}
                    </span>
                </div>

                {!solo && expanded && (
                    <span className="transition-transform duration-200">
                        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                )}
            </button>

            {!solo && open && (
                <ul className="ml-8 mt-1 space-y-1 border-l border-gray-700 pl-2">
                    {items.map((item) => (
                        <li key={item.vista}>
                            <SiderLink
                                icon={() => <span className="w-[20px]" />}
                                label={item.label}
                                vista={item.vista}
                                setVistaActual={setVistaActual}
                                setSidebarOpen={setSidebarOpen}
                                active={vistaActual === item.vista}
                                expanded={expanded}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
