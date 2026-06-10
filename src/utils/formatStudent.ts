export const formatName = (name: string) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const formatYearLabel = (yearLabel: string) => {
  switch (yearLabel) {
    case "firstYear":
      return "First Year";
      break;
    case "secondYear":
      return "Second Year";
      break;
    case "thirdYear":
      return "Third Year";
      break;
    case "fourthYear":
      return "Fourth Year";
      break;
    default:
      return "Unknown Year";
  }
};

export const formatRegNo = (regNo: string) => {
  return regNo.toUpperCase();
};
