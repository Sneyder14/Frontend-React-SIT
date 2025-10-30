import RegistroUsuarios from "../components/Registros/RegistroUsuarios";
import RegistroCursos from "../components/Registros/RegistroCursos";
import RegistroProfesores from "../components/Registros/RegistroProfesores";
import RegistroSemestres from "../components/Registros/RegistroSemestres";
import RegistroEstudiantes from "../components/Registros/RegistroEstudiantes";
import RegistroAcademicCuts from "../components/Registros/RegistroAcademicCuts";
import RegistroCutGrades from "../components/Registros/RegistroCutGrades";
import RegistroClassificationTypes from "../components/Registros/RegistroClassificationTypes";
import RegistroCourseStudents from "../components/Registros/RegistroCourseStudents";
import RegistroCourseTeachers from "../components/Registros/RegistroCourseTeachers";
import RegistroAcademicCutTypes from "../components/Registros/RegistroAcademicCutTypes";
import RegistroEncabezadosMSLQ from "../components/Registros/RegistroEncabezadosMSLQ";
import RegistroRespuestasDetallesMSLQ from "../components/Registros/RegistroRespuestasDetallesMSLQ";
import RegistroItemsMSLQ from "../components/Registros/RegistroItemsMSLQ"
import RegistroRespuestasMSLQ from "../components/Registros/RegistroRespuestaMSLQ";
import RegistroIntentosEjercicio from "../components/Registros/RegistroIntentosEjercicios";
import RegistroTareasEstudiante from "../components/Registros/RegistroTareasEstudiante";
import RegistroEjerciciosApoyo from "../components/Registros/RegistroEjerciciosApoyo";
import RegistroTemasApoyo from "../components/Registros/RegistroTemasApoyo";
import RegistroTareas from "../components/Registros/RegistroTareas";
import RegistroCalificacionesTareas from "../components/Registros/RegistroCalificacionesTareas";
import RegistroGruposTutoria from "../components/Registros/RegistroGruposTutoria";
import RegistroParticipacionTutoria from "../components/Registros/RegistroParticipacionTutoria";
import RegistroTemasTutoria from "../components/Registros/RegistroTemasTutoria";
import RegistroPrediccionesModelo from "../components/Registros/RegistroPrediccionesModelo";

export default function Registros({ subVista }) {
  const vistas = {
    usuarios: <RegistroUsuarios />,
    cursos: <RegistroCursos />,
    profesores: <RegistroProfesores />,
    semestres: <RegistroSemestres />,
    estudiantes: <RegistroEstudiantes />,
    cortes: <RegistroAcademicCuts />,
    notasCorte: <RegistroCutGrades />,
    classificationTypes: <RegistroClassificationTypes />,
    courseStudents: <RegistroCourseStudents />,
    courseTeachers: <RegistroCourseTeachers />,
    tiposCorte: <RegistroAcademicCutTypes />,
    encabezadosmslq: <RegistroEncabezadosMSLQ />,
    respuestasDetallesmslq: <RegistroRespuestasDetallesMSLQ />,
    itemsmslq: <RegistroItemsMSLQ />,
    respuestasmslq: <RegistroRespuestasMSLQ />,
    intentosejercicio: <RegistroIntentosEjercicio />,
    tareasestudiante: <RegistroTareasEstudiante />,
    ejerciciosapoyo: <RegistroEjerciciosApoyo />,
    temasapoyo: <RegistroTemasApoyo />,
    tareas: <RegistroTareas />,
    calificacionestareas: <RegistroCalificacionesTareas />,
    grupostutoria: <RegistroGruposTutoria />,
    participaciontutoria: <RegistroParticipacionTutoria />,
    temastutoria: <RegistroTemasTutoria />,
    prediccionesmodelo: <RegistroPrediccionesModelo />,
  };

  const titulos = {
    usuarios: "Gestión de Usuarios",
    cursos: "Gestión de Cursos",
    profesores: "Gestión de Profesores",
    semestres: "Gestión de Semestres",
    estudiantes: "Gestión de Estudiantes",
    cortes: "Gestión de Cortes Académicos",
    notasCorte: "Notas por Corte",
    classificationTypes: "Tipos de Clasificación",
    courseStudents: "Estudiantes por Curso",
    courseTeachers: "Profesores por Curso",
    tiposCorte: "Tipos de Corte Académico",
    encabezadosmslq: "Encabezados MSLQ",
    respuestasDetallesmslq: "Detalles de Respuestas MSLQ",
    itemsmslq: "Ítems MSLQ",
    respuestasmslq: "Respuestas MSLQ",
    intentosejercicio: "Intentos de Ejercicio",
    tareasestudiante: "Tareas por Estudiante",
    ejerciciosapoyo: "Ejercicios de Apoyo",
    temasapoyo: "Temas de Apoyo",
    tareas: "Gestión de Tareas",
    calificacionestareas: "Calificaciones de Tareas",
    grupostutoria: "Grupos de Tutoría",
    participaciontutoria: "Participación en Tutoría",
    temastutoria: "Temas de Tutoría",
    prediccionesmodelo: "Predicciones del Modelo",

  };


  return (
    <main className="flex-1 p-6 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold text-[#685CFE] mb-6 uppercase text-center font-[roboto]">
        {titulos[subVista] ?? "Registros"}
      </h1>

      <div className="animate-fade">
        {vistas[subVista] ?? (
          <div className="text-gray-500 text-center py-10">
            Vista <strong>{subVista}</strong> no disponible.
          </div>
        )}
      </div>
    </main>
  );
}
