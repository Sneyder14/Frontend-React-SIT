import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nombre requerido";
    if (!form.last_name.trim()) newErrors.last_name = "Apellido requerido";
    if (!form.email.trim()) {
      newErrors.email = "Correo requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }
    if (!form.password.trim()) {
      newErrors.password = "Contraseña requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }
    if (!form.agree) newErrors.agree = "Debes aceptar los términos";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        name: form.name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      });
      console.log("Respuesta completa del backend:", response.data);


      console.log("Registro exitoso:", response.data);
      const { tokens, user } = response.data;

      // Derivar el rol desde id_role si el backend lo envía
      const role = user.id_role === 1 ? "admin" : "student";

      // Guardar en contexto con datos reales
      login(tokens.access, role, user, tokens.refresh);

      // Redirigir según rol
      navigate(role === "admin" ? "/admin" : "/dashboard");

    } catch (error) {
      console.error("Error al registrar:", error);
      setServerError(
        error.response?.data?.message || "Error al registrar. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className={`w-full max-w-md bg-white shadow-xl rounded-xl p-6 transition-all duration-150 ${shake ? "animate-shake" : ""}`}
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-indigo-600">Sign Up to FlyonUI</h2>
          <p className="text-sm text-gray-500">Please enter your details to sign up</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "last_name", "email", "password"].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === "password" && !showPassword ? "password" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className={`peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:ring ${errors[field] ? "border-red-500 ring-red-300" : "border-gray-300 focus:border-indigo-500"
                  }`}
                placeholder=" "
              />
              <label
                htmlFor={field}
                className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
              >
                {field === "name"
                  ? "Nombre"
                  : field === "last_name"
                    ? "Apellido"
                    : field === "email"
                      ? "Correo electrónico"
                      : "Contraseña"}
              </label>
              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className={`mt-1 ${errors.agree ? "ring-2 ring-red-400" : ""}`}
            />
            <label className="text-gray-600">
              I agree to{" "}
              <a href="/privacy" className="text-indigo-600 hover:underline">privacy policy</a> and{" "}
              <a href="/terms" className="text-indigo-600 hover:underline">terms</a>
            </label>
          </div>
          {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
          {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Registrando..." : "Sign Up to FlyonUI"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">Sign in instead</a>
        </p>
      </div>
    </div>
  );
}
