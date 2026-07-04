import { slotStructure } from "@/data/slots";
import type { SelectedFaculty } from "@/types/selectedFaculty";
import type { Timetable, TimetableCell } from "@/types/timetable";

export const generateTimetable = (
  selectedFaculty: SelectedFaculty[],
): Timetable => {
  const timetable: Timetable = {};
  Object.entries(slotStructure).forEach(([day, structure]) => {
    timetable[day] = [];
    structure.slots.forEach((slotRow) => {
      let matched: TimetableCell | null = null;
      selectedFaculty.forEach((course) => {
        if (course.theory) {
          const hasTheorySlot = course.theory.slots.some((slot) =>
            slotRow.theorySlots.includes(slot),
          );
          if (hasTheorySlot) {
            const matchedSlots = course.theory.slots.filter((slot) =>
              slotRow.theorySlots.includes(slot),
            );

            matched = {
              courseCode: course.courseCode,
              faculty: course.theory.name,
              slots: course.theory.slots,
              currentSlot: matchedSlots,
              type: "theory",
            };
          }
        }
        if (course.lab) {
          const hasLabSlot = course.lab.slots.some((slot) =>
            slotRow.labSlots.includes(slot),
          );
          if (hasLabSlot) {
            const matchedSlots = course.lab.slots.filter((slot) =>
              slotRow.labSlots.includes(slot),
            );

            matched = {
              courseCode: course.courseCode,
              faculty: course.lab.name,
              slots: course.lab.slots,
              currentSlot: matchedSlots,
              type: "lab",
            };
          }
        }
      });
      timetable[day].push({
        time: slotRow.time,
        theorySlots: slotRow.theorySlots,
        labSlots: slotRow.labSlots,
        isLunch: slotRow.isLunch,
        data: matched,
      });
    });
  });
  return timetable;
};
