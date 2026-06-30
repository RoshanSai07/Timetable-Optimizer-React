import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Student } from "@/types/student";
import type { FacultyBranchData } from "@/types/faculty";
import { restoreStudentSession } from "@/features/session/restoreStudentSession";
interface AcademicContextType {
  student: Student | null;
  faculty: FacultyBranchData | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>;
  setFaculty: React.Dispatch<React.SetStateAction<FacultyBranchData | null>>;
}

export const AcademicContext = createContext<AcademicContextType | null>(null);

export function AcademicProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [faculty, setFaculty] = useState<FacultyBranchData | null>(null);

  useEffect(() => {
    restoreStudentSession({
      setStudent,
      setFaculty,
    });
  }, []);

  return (
    <AcademicContext.Provider
      value={{
        student,
        faculty,
        setStudent,
        setFaculty,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (context == null) {
    throw new Error("useAcademic must be used within AcademicProvider");
  }
  return context;
}
