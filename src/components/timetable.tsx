import type { Student } from "../types/student";
import type { SelectedFaculty } from "../types/selectedFaculty";
import { generateTimetable } from "../utils/generateTimetable";
import type { Course } from "../types/course";
import FacultySummary from "./facultyInfo";
import { useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import ExportCenter from "./ExportCenter";

type TimetableProps = {
  currentSection?: string;
  setCurrentSection?: React.Dispatch<React.SetStateAction<string>>;
  onImportSuccess?: () => void;
};

export default function Timetable({
  setCurrentSection,
  onImportSuccess,
}: TimetableProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const student: Student = JSON.parse(
    sessionStorage.getItem("student") || "{}",
  );
  const selectedFaculty: SelectedFaculty[] = JSON.parse(
    sessionStorage.getItem("selectedFaculty") || "[]",
  );
  const timetable = generateTimetable(selectedFaculty);
  const days = Object.keys(timetable);
  const rows = timetable[days[0]] || [];
  const selectedCourses: Course[] = JSON.parse(
    sessionStorage.getItem("selectedCourses") || "[]",
  );
  return (
    <section className="flex flex-1 items-start justify-center px-20 py-20">
      <div className="w-full max-w-7xl space-y-6">
        <div className="relative space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Weekly Timetable
          </h1>
          <p className="max-w-2xl text-md leading-7 text-muted-foreground">
            Final clash-free schedule generated from your selected faculty.{" "}
          </p>
          <div className="absolute top-0 right-5 flex gap-3">
            <button
              onClick={() => setExportOpen(true)}
              className="cursor-pointer rounded-md flex gap-2 items-center bg-primary px-7 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Share2 className="h-4 w-4" />
              <div>Share</div>
            </button>

            <button
              onClick={() => setCurrentSection?.("faculty")}
              className="cursor-pointer rounded-md flex gap-2 items-center border border-border px-5 py-2 text-sm font-medium text-foreground/70 transition-all hover:text-foreground hover:border-primary/20"
            >
              <ArrowLeft className="text-forground w-5 h-5" />
              <div>Back</div>
            </button>
          </div>
        </div>

        <FacultySummary
          selectedCourses={selectedCourses}
          selectedFaculty={selectedFaculty}
        />

        <div className="overflow-x-auto rounded-xl border border-border bg-card p-5">
          <table className="w-full border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="h-[50px] min-w-[100px] rounded-md border border-border bg-muted/20">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
                    DAY
                  </div>
                </th>

                {rows.map((row) => (
                  <th
                    key={row.time}
                    className={`h-[50px] min-w-[160px] rounded-md border border-border text-center ${
                      row.time === "12.50 - 1.30"
                        ? "bg-secondary/[0.05]"
                        : "bg-muted/[0.15]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-semibold tracking-tight text-foreground">
                        {row.time}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="h-[75px] rounded-md border border-border bg-muted/20 text-center">
                    <div className="text-sm font-semibold tracking-wide text-foreground">
                      {day}
                    </div>
                  </td>

                  {timetable[day].map((cell) => (
                    <td
                      key={`${day}-${cell.time}`}
                      className="h-[75px] min-w-[160px]"
                    >
                      {cell.data ? (
                        <div
                          className={`
                            flex h-full w-full flex-col justify-between rounded-md border px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 ${
                              cell.data.type === "theory"
                                ? `
                                  border-primary/15
                                  bg-primary/[0.07]
                                `
                                : `
                                  border-secondary/15
                                  bg-secondary/[0.07]
                                `
                            }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div
                                className={`
                                text-sm font-semibold tracking-tight
                                ${
                                  cell.data.type === "theory"
                                    ? "text-primary"
                                    : "text-secondary"
                                }
                              `}
                              >
                                {cell.data.courseCode}
                              </div>
                              <div className="rounded-md border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                {cell.data.currentSlot.join(" / ")}
                              </div>
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {cell.data.faculty}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-full w-full rounded-md border border-border/60 ">
                          <div className="absolute bottom-2 right-2 text-[9px] text-muted-foreground/50">
                            {[...cell.theorySlots, ...cell.labSlots].join(
                              " / ",
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportCenter
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        student={student}
        selectedCourses={selectedCourses}
        selectedFaculty={selectedFaculty}
        onImportSuccess={onImportSuccess || (() => {})}
      />
    </section>
  );
}
