import type { Student } from "../types/student";

export const parseEmail = (email: string): Student => {
  const lowerCase = email.trim().toLowerCase();
  if (!lowerCase.endsWith("@vitapstudent.ac.in")) {
    throw new Error("Please use VIT-AP student mail");
  }
  const username = lowerCase.split("@")[0];
  const parts = username.split(".");
  if (parts.length !== 2) {
    throw new Error("Invalid email format");
  }
  const name = parts[0];
  const regNo = parts[1];
  if (regNo.length < 5) {
    throw new Error("Invalid registration number");
  }
  const joinYear = regNo.slice(0, 2);
  const branch = regNo.slice(2, 5).toUpperCase() as Student["branch"];
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth();

  let academicYear = currentYear - Number(joinYear);
  if (currentMonth >= 4) {
    academicYear += 1;
  }
  let yearLabel: Student["yearLabel"];

  switch (academicYear) {
    case 1:
      yearLabel = "firstYear";
      break;
    case 2:
      yearLabel = "secondYear";
      break;
    case 3:
      yearLabel = "thirdYear";
      break;
    case 4:
      yearLabel = "fourthYear";
      break;
    default:
      throw new Error("Invalid academic year");
  }
  return {
    email,
    name,
    joinYear,
    branch,
    regNo,
    academicYear,
    yearLabel,
  };
};
