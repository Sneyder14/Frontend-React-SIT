import RegistroUsuarios from "../components/Registros/RegistroUsuarios";
import RegistroCursos from "../components/Registros/RegistroCrusos";
import RegistroProfesores from "../components/Registros/RegistroProfesores";
import RegistroSemestres from "../components/Registros/RegistroSemestres";
import RegistroEstudiantes from "../components/Registros/RegistroEstudiantes";
import RegistroAcademicCuts from "../components/Registros/RegistroAcedemicCuts";
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

export default function Registros({ subVista }) {
  const vistas = {
    usuarios: <RegistroUsuarios />,
    cursos: <RegistroCursos />,
    profesores: <RegistroProfesores />,
    semestres: <RegistroSemestres />,
    estudiantes: <RegistroEstudiantes />,
    cortes: <RegistroAcademicCuts/>,
    notasCorte: <RegistroCutGrades/>,
    clasificaciones: <RegistroClassificationTypes/>,
    cursoEstudiantes: <RegistroCourseStudents/>,
    cursoDocentes: <RegistroCourseTeachers/>,
    tiposCorte: <RegistroAcademicCutTypes/>,
    encabezadosmslq: <RegistroEncabezadosMSLQ/>,
    respuestasDetallesmslq: <RegistroRespuestasDetallesMSLQ/>,
    itemsmslq: <RegistroItemsMSLQ/>,
    respuestasmslq:<RegistroRespuestasMSLQ/>,
    intentosejercicio: <RegistroIntentosEjercicio/>,
    tareasestudiante: <RegistroTareasEstudiante/>,
    ejerciciosapoyo:<RegistroEjerciciosApoyo/>,
    temasapoyo: <RegistroTemasApoyo/>,
    tareas: <RegistroTareas/>,
    calificacionestareas: <RegistroCalificacionesTareas/>,
    grupostutoria:<RegistroGruposTutoria/>,
    participaciontutoria: <RegistroParticipacionTutoria/>,
    temastutoria: <RegistroTemasTutoria/>
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold text-[#101828] mb-6 font-[poppins] uppercase text-center">
        Registros
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
