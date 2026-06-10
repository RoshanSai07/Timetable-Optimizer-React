import type { FacultyMember } from "./faculty";

export type SelectedFaculty = {
  courseCode: string;
  theory: FacultyMember | null;
  lab: FacultyMember | null;
};
