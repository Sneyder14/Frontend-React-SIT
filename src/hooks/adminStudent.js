import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://72.61.0.205:8000/api/auth/users/";

export default function AdminStudent() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");

  // Cargar todos los usuarios
  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
      setFiltered(response.data);
    } catch (err) {
      toast.error("Error al cargar usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Filtrar por ID
  const handleSearch = (id) => {
    setSearchId(id);
    if (id.trim() === "") {
      setFiltered(students);
    } else {
      const match = students.filter((user) =>
        user.id_user?.toString().includes(id.trim())
      );
      setFiltered(match);
    }
  };

  // ➕ Crear nuevo estudiante
  const createStudent = async (data) => {
    const token = localStorage.getItem("token");
    const payload = { ...data, id_role: 2, is_active: true };
    await toast.promise(
      axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Guardando usuario...",
        success: "Usuario creado correctamente",
        error: "Error al crear usuario",
      }
    ).then((response) => {
      setStudents((prev) => [...prev, response.data]);
      handleSearch(searchId);
    });
  };

  // ✏️ Actualizar estudiante
  const updateStudent = async (id_user, data) => {
    const token = localStorage.getItem("token");
    await toast.promise(
      axios.put(`${API_URL}${id_user}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Actualizando usuario...",
        success: "Usuario actualizado",
        error: "Error al actualizar usuario",
      }
    ).then((response) => {
      setStudents((prev) =>
        prev.map((user) => (user.id_user === id_user ? response.data : user))
      );
      handleSearch(searchId);
    });
  };

  // 🗑️ Eliminar estudiante
  const deleteStudent = async (id_user) => {
    const token = localStorage.getItem("token");
    await toast.promise(
      axios.delete(`${API_URL}${id_user}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Eliminando usuario...",
        success: "Usuario eliminado",
        error: "Error al eliminar usuario",
      }
    ).then(() => {
      setStudents((prev) => prev.filter((user) => user.id_user !== id_user));
      handleSearch(searchId);
    });
  };

  // ⏱️ Cargar al montar
  useEffect(() => {
    fetchStudents();
  }, []);

  // 📦 Exportar funciones y estado
  return {
    students: filtered,
    loading,
    searchId,
    handleSearch,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}
