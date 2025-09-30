export default function FloatingInput({
    name,
    label,
    type = "text",
    value,
    onChange,
    error,
    icon,
    autoComplete = "off",
}) {
    return (
        <div className="relative">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={`peer w-full px-3 py-2 pt-5 text-sm text-gray-800 bg-white border rounded-md outline-none transition-all placeholder-transparent
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-600"}
          ${icon ? "pr-10" : ""}
        `}
                placeholder={label}
            />
            <label
                htmlFor={name}
                className={`absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600`}
            >
                {label}
            </label>
            {icon && (
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-auto">
                    {icon}
                </div>
            )}
        </div>
    );
}
