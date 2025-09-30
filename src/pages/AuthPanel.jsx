import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import StatusModal from "../components/StatusModal";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function AuthPanel() {
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [shakeForm, setShakeForm] = useState(false);
    const [modalError, setModalError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const validate = () => {
        const newErrors = {};
        if (mode === "register") {
            if (!form.name.trim()) newErrors.name = "Nombre requerido";
            if (!form.last_name.trim()) newErrors.last_name = "Apellido requerido";
            if (!form.agree) newErrors.agree = "Debes aceptar los términos";
            if (!form.confirm_password.trim()) {
                newErrors.confirm_password = "Confirma tu contraseña";
            } else if (form.password !== form.confirm_password) {
                newErrors.confirm_password = "Las contraseñas no coinciden";
            }
        }
        if (!form.email.trim()) {
            newErrors.email = "Correo requerido";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Correo inválido";
        }
        if (!form.password.trim()) {
            newErrors.password = "Contraseña requerida";
        } else if (form.password.length < 8) {
            newErrors.password = "Mínimo 8 caracteres";
        } else if (!/[A-Z]/.test(form.password)) {
            newErrors.password = "Debe contener al menos una mayúscula";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
            newErrors.password = "Debe contener al menos un carácter especial";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setForm((prev) => ({ ...prev, [name]: newValue }));
        setErrors((prev) => {
            const updated = { ...prev };
            if (type === "checkbox" && checked) {
                delete updated[name];
            } else if (typeof value === "string" && value.trim() !== "") {
                delete updated[name];
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShakeForm(true);
            setModalError("Por favor corrige los campos marcados");
            return;
        }

        try {
            setLoading(true);

            const url =
                mode === "login"
                    ? "http://127.0.0.1:8000/api/auth/login/"
                    : "http://127.0.0.1:8000/api/auth/register/";

            const payload =
                mode === "login"
                    ? { email: form.email, password: form.password }
                    : {
                        name: form.name,
                        last_name: form.last_name,
                        email: form.email,
                        password: form.password,
                    };

            const response = await axios.post(url, payload);
            const { tokens, user } = response.data;
            const accessToken = tokens?.access;
            const refreshToken = tokens?.refresh;

            if (!accessToken || !user) {
                setModalError("Error al iniciar sesión. Datos incompletos.");
                setTimeout(() => setModalError(""), 2500);
                return;
            }

            const role = user.id_role === 1 ? "student" : "admin";
            login(accessToken, role, user, refreshToken);
            setLoginSuccess(true);

            setTimeout(() => {
                setLoginSuccess(false);
                navigate(role === "admin" ? "/admin" : "/students");
            }, 2000);
        } catch (error) {
            setModalError(
                error.response?.data?.message ||
                error.response?.data?.detail ||
                "Error al iniciar sesión. Intenta nuevamente."
            );
            setTimeout(() => setModalError(""), 2500);
        } finally {
            setLoading(false);
        }
    };

    const panelVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 transition-all duration-300">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-indigo-700">
                        {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {mode === "login"
                            ? "Accede con tus credenciales"
                            : "Completa los campos para registrarte"}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={panelVariants}
                        transition={{ duration: 0.4 }}
                    >
                        {mode === "login" ? (
                            <LoginForm
                                form={form}
                                errors={errors}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                loading={loading}
                                showPassword={showPassword}
                                togglePassword={() => setShowPassword(!showPassword)}
                                shakeForm={shakeForm}
                            />
                        ) : (
                            <RegisterForm
                                form={form}
                                errors={errors}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                loading={loading}
                                showPassword={showPassword}
                                togglePassword={() => setShowPassword(!showPassword)}
                                showConfirm={showConfirm}
                                toggleConfirm={() => setShowConfirm(!showConfirm)}
                                shakeForm={shakeForm}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                <hr className="my-6 border-t border-gray-200" />

                <p className="text-sm text-center text-gray-600">
                    {mode === "login" ? (
                        <>
                            ¿No tienes cuenta?{" "}
                            <button
                                onClick={() => setMode("register")}
                                className="text-indigo-600 hover:underline font-medium"
                            >
                                Regístrate
                            </button>
                        </>
                    ) : (
                        <>
                            ¿Ya tienes cuenta?{" "}
                            <button
                                onClick={() => setMode("login")}
                                className="text-indigo-600 hover:underline font-medium"
                            >
                                Inicia sesión
                            </button>
                        </>
                    )}
                </p>

                <StatusModal
                    type="error"
                    message={modalError}
                    visible={!!modalError}
                    onClose={() => setModalError("")}
                />

                <StatusModal
                    type="success"
                    message="Ingreso exitoso"
                    visible={loginSuccess}
                    onClose={() => setLoginSuccess(false)}
                />

            </div>
        </div>
    );
}
