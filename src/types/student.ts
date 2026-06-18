import type { AcademicYear, Branch } from "./course";

export type Student = {
  email: string;
  name: string;
  joinYear: string;
  branch: Branch;
  regNo: string;
  academicYear: number;
  yearLabel: AcademicYear;
};
