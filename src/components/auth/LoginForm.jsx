import FloatingInput from "../inputs/FloatingInput";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({
    form,
    errors,
    onChange,
    onSubmit,
    loading,
    showPassword,
    togglePassword,
    shakeForm,
    handleAdminSimulado,
}) {
    return (
        <>
            <form onSubmit={onSubmit} className="space-y-6">
                <FloatingInput
                    name="email"
                    label="Correo electrónico"
                    value={form.email}
                    onChange={onChange}
                    error={errors.email}
                    shake={shakeForm}
                />
                <FloatingInput
                    name="password"
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={onChange}
                    error={errors.password}
                    shake={shakeForm}
                    icon={
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {loading ? "Ingresando..." : "Iniciar sesión"}
                </button>
            </form>
        </>
    );
}
