import { slotMap } from "../data/slots";

type SelectedFaculty = {
  courseCode: string;
  facultyName: string;
  slots: string[];
};

type Clash = {
  courses: string[];
  slots: string[];
};

export const detectClashes = (selectedFaculty: SelectedFaculty[]): Clash[] => {
  const timeMap = new Map<
    string,
    {
      entries: {
        courseCode: string;
        slot: string;
      }[];
    }
  >();

  selectedFaculty.forEach((faculty) => {
    faculty.slots.forEach((slot) => {
      const slotInfo = slotMap[slot];

      if (!slotInfo) return;

      const timeKey = `${slotInfo.day}-${slotInfo.time}`;

      if (!timeMap.has(timeKey)) {
        timeMap.set(timeKey, {
          entries: [],
        });
      }

      timeMap.get(timeKey)!.entries.push({
        courseCode: faculty.courseCode,
        slot,
      });
    });
  });

  const clashes: Clash[] = [];

  timeMap.forEach((entry) => {
    if (entry.entries.length > 1) {
      const courses = [
        ...new Set(entry.entries.map((item) => item.courseCode)),
      ];

      const slots = [...new Set(entry.entries.map((item) => item.slot))];

      clashes.push({
        courses,
        slots,
      });
    }
  });

  return clashes;
};
