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
  currentSection,
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
  const hasCourses = selectedCourses.length > 0;
  const [exportTab, setExportTab] = useState<
    "png" | "pdf" | "json-export" | "json-import"
  >("png");

  return (
    <section className="flex flex-1 items-start justify-center px-8 pt-15 pb-5 sm:px-8 md:px-10 lg:px-20 lg:py-20">
      <div className="w-full max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Weekly Timetable
            </h1>

            <p className="max-w-2xl text-sm leading-5 text-muted-foreground md:text-base">
              Final clash-free schedule generated from your selected faculty.
            </p>
          </div>

          <div className="flex w-full gap-3 md:w-auto">
            <button
              onClick={() => setExportOpen(true)}
              className=" flex-1 cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Share2 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setCurrentSection?.("faculty")}
              className="flex-1 cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md border border-border text-xs md:text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {!hasCourses ? (
          <div className="rounded-lg border border-border bg-card p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">
                  No courses selected
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Start by selecting the courses you plan to register for. Once
                  courses are added, you can choose faculty and generate your
                  timetable.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <button
                  onClick={() => {
                    setExportTab("json-import");
                    setExportOpen(true);
                  }}
                  className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md border border-border text-xs md:text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  Import Timetable
                </button>

                <button
                  onClick={() => setCurrentSection?.("courses")}
                  className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Go to Courses</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <FacultySummary
            selectedCourses={selectedCourses}
            selectedFaculty={selectedFaculty}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        )}

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
        initialTab={exportTab}
      />
    </section>
  );
}
