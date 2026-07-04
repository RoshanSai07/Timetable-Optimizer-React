import type { FacultyBranchData } from "@/types/faculty";
import type { Student } from "@/types/student";

type ClearSessionOptions = {
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  setFaculty: React.Dispatch<React.SetStateAction<FacultyBranchData | null>>;
};

export function clearStudentSession({
  setStudent,
  setFaculty,
}: ClearSessionOptions): void {
  sessionStorage.removeItem("student");
  setStudent(null);
  setFaculty(null);
}
