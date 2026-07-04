import { fetchFaculty } from "@/features/faculty/engine/fetchFaculty";
import type { Student } from "@/types/student";
import type { FacultyBranchData } from "@/types/faculty";

type InitializeSessionOptions = {
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  setFaculty: React.Dispatch<React.SetStateAction<FacultyBranchData | null>>;
};

export async function initializeStudentSession(
  student: Student,
  { setStudent, setFaculty }: InitializeSessionOptions,
): Promise<void> {
  try {
    sessionStorage.setItem("student", JSON.stringify(student));
    const faculty = await fetchFaculty(student);
    setStudent(student);
    setFaculty(faculty);
  } catch (error) {
    console.error("Failed to initialize student session", error);
    throw error;
  }
}
