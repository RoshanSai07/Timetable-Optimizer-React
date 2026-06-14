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
  const cleaned = selectedFaculty.map((f) => ({
    ...f,
    slots: [...new Set(f.slots)],
  }));

  const timeMap = new Map<string, { courseCode: string; slot: string }[]>();

  cleaned.forEach((faculty) => {
    faculty.slots.forEach((slot) => {
      const possibleTimings = slotMap[slot];
      if (!possibleTimings || possibleTimings.length === 0) {
        console.warn(`Unknown slot: ${slot} for ${faculty.courseCode}`);
        return;
      }
      possibleTimings.forEach((timing) => {
        const timeKey = `${timing.day}-${timing.time}`;
        if (!timeMap.has(timeKey)) timeMap.set(timeKey, []);
        timeMap.get(timeKey)!.push({
          courseCode: faculty.courseCode,
          slot,
        });
      });
    });
  });

  const rawClashes: Clash[] = [];
  timeMap.forEach((entries) => {
    if (entries.length > 1) {
      const courses = [...new Set(entries.map((e) => e.courseCode))];
      const slots = [...new Set(entries.map((e) => e.slot))];
      rawClashes.push({ courses, slots });
    }
  });

  const merged = new Map<string, { courses: string[]; slots: Set<string> }>();
  for (const clash of rawClashes) {
    const key = clash.courses.slice().sort().join("|");
    if (!merged.has(key)) {
      merged.set(key, { courses: clash.courses, slots: new Set(clash.slots) });
    } else {
      clash.slots.forEach((s) => merged.get(key)!.slots.add(s));
    }
  }

  return Array.from(merged.values()).map(({ courses, slots }) => ({
    courses,
    slots: Array.from(slots).sort(),
  }));
};
