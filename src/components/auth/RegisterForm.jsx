import FloatingInput from "../inputs/FloatingInput";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function RegisterForm({
    form,
    errors,
    onChange,
    onSubmit,
    loading,
    showPassword,
    togglePassword,
    showConfirm,
    toggleConfirm,
    shakeForm,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className={`space-y-6 transition-all duration-300 ${shakeForm ? "animate-shake" : ""
                }`}
        >
            <FloatingInput
                name="name"
                label="Nombre"
                value={form.name}
                onChange={onChange}
                error={errors.name}
                shake={shakeForm}
                autoComplete="given-name"
            />

            <FloatingInput
                name="last_name"
                label="Apellido"
                value={form.last_name}
                onChange={onChange}
                error={errors.last_name}
                shake={shakeForm}
                autoComplete="family-name"
            />

            <FloatingInput
                name="email"
                label="Correo electrónico"
                value={form.email}
                onChange={onChange}
                error={errors.email}
                shake={shakeForm}
                autoComplete="email"
            />

            <FloatingInput
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={onChange}
                error={errors.password}
                shake={shakeForm}
                autoComplete="new-password"/>

            <FloatingInput
                name="confirm_password"
                label="Confirmar contraseña"
                type={showConfirm ? "text" : "password"}
                value={form.confirm_password}
                onChange={onChange}
                error={errors.confirm_password}
                shake={shakeForm}
                autoComplete="new-password"/>

            <div className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={onChange}
                    className="accent-indigo-600"
                />
                <label htmlFor="agree">
                    Acepto los{" "}
                    <span className="text-indigo-600 hover:underline cursor-pointer">
                        términos y condiciones
                    </span>
                </label>
            </div>
            {errors.agree && (
                <p className="text-red-600 text-sm -mt-4">{errors.agree}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <UserPlus size={18} />
                {loading ? "Registrando..." : "Crear cuenta"}
            </button>
        </form>
    );
}
