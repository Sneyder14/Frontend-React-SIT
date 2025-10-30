import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { FiChevronDown, FiUser, FiSettings, FiLogOut, FiBook } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import useClickOutside from "../../hooks/useClickOutside";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": { transform: "scale(.8)", opacity: 1 },
    "100%": { transform: "scale(2.4)", opacity: 0 },
  },
}));

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const domNode = useClickOutside(() => setOpen(false));
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "US";

  return (
    <div ref={domNode} className="relative inline-block text-left font-[roboto]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition"
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar sx={{ bgcolor: "#685CFE", fontWeight: 600 }}>{initials}</Avatar>
        </StyledBadge>
        <FiChevronDown className="text-gray-500 text-lg" />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 z-50 min-w-[12rem] max-w-xs w-full rounded-md bg-white shadow-xl transition-all duration-200 border border-gray-200 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="py-2 px-3 text-sm text-gray-700 font-inter">
          <DropdownItem icon={<FiUser />} label="Mi perfil" href="" />
          <DropdownItem icon={<FiBook />} label="Mis contactos" href="" />
          <DropdownItem icon={<FiSettings />} label="Configuración" href="" />
        </ul>
        <div className="border-t border-gray-100 px-3 py-2">
          <DropdownItem icon={<FiLogOut />} label="Cerrar sesión" onClick={logout} />
        </div>
      </div>
    </div>
  );
}


function DropdownItem({ label, icon, href, onClick }) {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#685CFE] hover:text-white transition cursor-pointer"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
