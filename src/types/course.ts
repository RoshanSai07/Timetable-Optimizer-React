export type Course = {
  code: string;
  name: string;
  credits: number;
};

export type AcademicYear =
  | "firstYear"
  | "secondYear"
  | "thirdYear"
  | "fourthYear";

export type Branch = "BCE" | "BCA" | "BCD" | "BEC" | "MIC" | "MIS";

export type CoursesData = {
  [year in AcademicYear]: {
    [branch in Branch]?: Course[];
  };
};
