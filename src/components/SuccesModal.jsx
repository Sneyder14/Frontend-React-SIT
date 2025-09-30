import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = {
  success: <CheckCircle size={48} className="text-green-500" />,
  error: <XCircle size={48} className="text-red-500" />,
  warning: <AlertTriangle size={48} className="text-yellow-500" />,
};

const titles = {
  success: "¡Éxito!",
  error: "Error",
  warning: "Advertencia",
};

export default function StatusModal({ type = "success", message = "", visible }) {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center border border-gray-200"
        >
          <div className="mb-3">{icons[type]}</div>
          <h3 className="text-lg font-semibold text-gray-800">{titles[type]}</h3>
          <p className="text-sm text-gray-500 mt-1">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
