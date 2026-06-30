import type { AcademicYear, Branch } from "./course";

export type FacultyMember = {
  name: string;
  slots: string[];
};

export type FacultyCourse = {
  theory: FacultyMember[];
  lab: FacultyMember[];
};

export type FacultyData = {
  [year in AcademicYear]: {
    [branch in Branch]?: {
      [courseCode: string]: FacultyCourse;
    };
  };
};

export type FacultyBranchData = {
  [courseCode: string]: FacultyCourse;
};
