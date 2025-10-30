export default function SiderLink({
  icon: Icon,
  label,
  vista,
  setVistaActual,
  active,
  setSidebarOpen,
  expanded,
}) {
  const handleClick = () => {
    setVistaActual(vista);
    setSidebarOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 p-2 rounded-lg w-full text-left duration-300 ease-in-out
        ${
          active
            ? "bg-[#685CFE] font-semibold shadow-md"
            : "hover:bg-[#685CFE]"
        } text-[#FFFFFF]`}
    >
      <Icon size={20} className="min-w-[20px]" />
      <span
        className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${
          expanded ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
