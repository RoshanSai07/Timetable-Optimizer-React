import type { AcademicYear, Branch } from "./course";

export type Student = {
  name: string;
  joinYear: string;
  branch: Branch;
  regNo: string;
  academicYear: number;
  yearLabel: AcademicYear;
};
