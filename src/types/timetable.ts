export type TimetableCell = {
  courseCode: string;
  faculty: string;
  slots: string[];
  currentSlot: string[];
  type: "theory" | "lab";
};

export type TimetableRow = {
  time: string;

  theorySlots: string[];

  labSlots: string[];

  isLunch?: boolean;

  data: TimetableCell | null;
};

export type Timetable = {
  [day: string]: TimetableRow[];
};
