export default function InputText({
  label = "Campo",
  type = "text",
  placeholder = "",
  value,
  onChange,
  helper = "",
  id = "input-id",
  valid = null, 
}) {
  // Determina la clase de validación
  const validationClass =
    valid === true ? "is-valid" : valid === false ? "is-invalid" : "";

  return (
    <div className="max-w-sm">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input w-full px-4 py-2 rounded-md shadow-sm focus:outline-none ${validationClass}`}
      />

      {helper && (
        <span className="helper-text text-xs mt-1 block">
          {helper}
        </span>
      )}
    </div>
  );
}
