import { forwardRef } from "react";
import type { Student } from "@/types/student";
import type { Course } from "@/types/course";
import type { SelectedFaculty } from "@/types/selectedFaculty";
import { generateTimetable } from "@/features/timetable/engine/generateTimetable";
import FacultySummary from "@/features/timetable/components/facultyInfo";
import {
  formatName,
  formatRegNo,
  formatYearLabel,
} from "@/utils/formatStudent";

type ExportPreviewProps = {
  student: Student;
  selectedCourses: Course[];
  selectedFaculty: SelectedFaculty[];
};

export const ExportPreview = forwardRef<HTMLDivElement, ExportPreviewProps>(
  ({ student, selectedCourses, selectedFaculty }, ref) => {
    const timetable = generateTimetable(selectedFaculty);
    const days = Object.keys(timetable);
    const rows = timetable[days[0]] || [];
    const totalCredits = selectedCourses.reduce(
      (sum, course) => sum + course.credits,
      0,
    );

    return (
      <div
        ref={ref}
        className="w-[2100px] bg-card p-8 rounded-2xl border border-border shadow-xl space-y-6 text-foreground font-sans"
      >
        <div className="flex justify-between items-start border-b border-border/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
              Timetable Optimizer
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Weekly Timetable Export
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <span>{formatName(student.name || "")}</span>
              <span>•</span>
              <span className="font-mono">
                {formatRegNo(student.regNo || "")}
              </span>
              <span>•</span>
              <span>{student.branch || ""}</span>
              <span>•</span>
              <span>{formatYearLabel(student.yearLabel || "")}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="rounded-xl border border-border bg-muted/20 px-5 py-3 text-center min-w-[90px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Courses
              </div>
              <div className="text-xl font-extrabold text-foreground mt-0.5">
                {selectedCourses.length}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-5 py-3 text-center min-w-[90px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Credits
              </div>
              <div className="text-xl font-extrabold text-primary mt-0.5">
                {totalCredits}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-5 py-3 text-center min-w-[90px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Days
              </div>
              <div className="text-xl font-extrabold text-secondary mt-0.5">
                {days.length}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Selected Faculty Overview
          </h3>
          <FacultySummary
            selectedCourses={selectedCourses}
            selectedFaculty={selectedFaculty}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            Weekly Schedule Grid
          </h3>
          <div className="rounded-xl border border-border bg-card p-4">
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="h-[45px] w-[120px] rounded-lg border border-border bg-muted/10">
                    <div className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground">
                      DAY
                    </div>
                  </th>

                  {rows.map((row) => (
                    <th
                      key={row.time}
                      className={`h-[45px] rounded-lg border border-border text-center ${
                        row.time === "12.50 - 1.30"
                          ? "bg-secondary/[0.03]"
                          : "bg-muted/[0.05]"
                      }`}
                    >
                      <div className="text-[11px] font-bold text-foreground">
                        {row.time}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="h-[70px] rounded-lg border border-border bg-muted/10 text-center">
                      <div className="text-xs font-bold text-foreground">
                        {day}
                      </div>
                    </td>

                    {timetable[day].map((cell) => (
                      <td
                        key={`${day}-${cell.time}`}
                        className="h-[70px] min-w-[155px] p-0"
                      >
                        {cell.data ? (
                          <div
                            className={`flex h-full w-full flex-col justify-between rounded-lg border px-3 py-2 ${
                              cell.data.type === "theory"
                                ? "border-primary/20 bg-primary/[0.04]"
                                : "border-secondary/20 bg-secondary/[0.04]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className={`text-xs font-bold ${
                                  cell.data.type === "theory"
                                    ? "text-primary"
                                    : "text-secondary"
                                }`}
                              >
                                {cell.data.courseCode}
                              </div>
                              <div className="rounded border border-border/40 bg-background/60 px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                                {cell.data.currentSlot.join(" / ")}
                              </div>
                            </div>
                            <div className="text-[10px] font-medium text-foreground truncate">
                              {cell.data.faculty}
                            </div>
                            <div className="text-[9px] font-medium text-muted-foreground">
                              {cell.data.type === "theory" ? "Theory" : "Lab"}
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-full w-full rounded-lg border border-border/40 bg-muted/[0.02] flex items-center justify-center">
                            <span className="text-[9px] text-muted-foreground/30 font-medium font-mono">
                              {[...cell.theorySlots, ...cell.labSlots].join(
                                " / ",
                              )}
                            </span>
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

        <div className="flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/50 pt-4 font-medium">
          <span>Generated from Timetable Optimizer</span>
          <span>
            Please verify slots on the official student portal before
            registering.
          </span>
        </div>
      </div>
    );
  },
);

ExportPreview.displayName = "ExportPreview";
