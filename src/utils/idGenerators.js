export const getNextCourseStudentId = (cursoEstudiantes) => {
    const ids = cursoEstudiantes.map((item) => item.course_student_id);
    const maxId = Math.max(...ids, 0);
    return maxId + 1;
};

export function getNextStudentsTaskId(tareas) {
    const ids = tareas.map((t) => t.students_task_id);
    const maxId = Math.max(...ids, 0);
    return maxId + 1;
}

