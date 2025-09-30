import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getNextCourseStudentId } from "../utils/idGenerators";

const API_URL = "http://127.0.0.1:8000/api/academics/course-students/";

export default function useCursoEstudiantes() {
    const [cursoEstudiantes, setCursoEstudiantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchCursoEstudiantes = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCursoEstudiantes(res.data);
        } catch (err) {
            toast.error("Error al cargar estudiantes por curso");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createCursoEstudiante = async (data) => {
        const cleanData = { ...data };
        cleanData.course_student_id = getNextCourseStudentId(cursoEstudiantes); 


        console.log("Datos enviados:", cleanData);

        await toast.promise(
            axios.post(API_URL, cleanData, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Registrando estudiante...",
                success: "Estudiante registrado",
                error: "Error al registrar estudiante",
            }
        ).then((res) => {
            setCursoEstudiantes((prev) => [...prev, res.data]);
        });
    };

    const updateCursoEstudiante = async (id, data) => {
        await toast.promise(
            axios.put(`${API_URL}${id}/`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Actualizando inscripción...",
                success: "Inscripción actualizada",
                error: "Error al actualizar inscripción",
            }
        ).then((res) => {
            setCursoEstudiantes((prev) =>
                prev.map((e) => (e.course_student_id === id ? res.data : e))
            );
        });
    };

    const deleteCursoEstudiante = async (id) => {
        await toast.promise(
            axios.delete(`${API_URL}${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
            {
                loading: "Eliminando inscripción...",
                success: "Inscripción eliminada",
                error: "Error al eliminar inscripción",
            }
        ).then(() => {
            setCursoEstudiantes((prev) =>
                prev.filter((e) => e.course_student_id !== id)
            );
        });
    };

    useEffect(() => {
        fetchCursoEstudiantes();
    }, []);

    return {
        cursoEstudiantes,
        createCursoEstudiante,
        updateCursoEstudiante,
        deleteCursoEstudiante,
        loading,
    };
}
