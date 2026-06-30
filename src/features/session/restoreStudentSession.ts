import { fetchFaculty } from "@/features/faculty/engine/fetchFaculty";
import type { FacultyBranchData } from "@/types/faculty";
import type { Student } from "@/types/student";

type RestoreSessionOptions = {
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  setFaculty: React.Dispatch<React.SetStateAction<FacultyBranchData | null>>;
};

export async function restoreStudentSession({
  setStudent,
  setFaculty,
}: RestoreSessionOptions): Promise<void> {
  const storedStudent = sessionStorage.getItem("student");
  if (!storedStudent) return;
  try {
    const student = JSON.parse(storedStudent) as Student;
    const faculty = await fetchFaculty(student);
    setStudent(student);
    setFaculty(faculty);
  } catch (error) {
    console.error("Failed to restore student session:", error);
    sessionStorage.removeItem("student");
  }
}
