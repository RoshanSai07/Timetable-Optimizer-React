import type { Course } from "@/types/course";
import type { SelectedFaculty } from "@/types/selectedFaculty";
import { ArrowLeft } from "lucide-react";

type FacultyInfoProps = {
  selectedCourses: Course[];
  selectedFaculty: SelectedFaculty[];
  currentSection?: string;
  setCurrentSection?: React.Dispatch<React.SetStateAction<string>>;
};

export default function FacultyInfo({
  setCurrentSection,
  selectedCourses,
  selectedFaculty,
}: FacultyInfoProps) {
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  if (selectedFaculty.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-muted/10">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
          <div>
            <h2 className="text-md font-semibold text-foreground">
              Faculty Overview
            </h2>
            <p className="md:mt-1 text-xs text-muted-foreground">
              {selectedCourses.length} Courses Selected
            </p>
          </div>

          <div className="rounded-lg bg-card px-4 py-2">
            <div className="text-xs text-muted-foreground">Total Credits</div>
            <div className="text-md md:text-lg font-semibold text-primary">
              {totalCredits}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-md md:text-lg font-semibold text-foreground">
                No faculty selected yet
              </h2>

              <p className="md:mt-1 text-xs md:text-sm leading-relaxed text-muted-foreground">
                Choose instructors for your selected courses to generate a
                timetable and check for slot clashes.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
              <button
                onClick={() => setCurrentSection?.("faculty")}
                className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Go to Faculty</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/10">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
        <div>
          <h2 className="text-md md:text-lg font-semibold text-foreground">
            Faculty Overview
          </h2>
          <p className="text-xs md:mt-1 md:text-sm text-muted-foreground">
            {selectedCourses.length} Courses Selected
          </p>
        </div>

        <div className="rounded-md bg-card px-4 py-2">
          <div className="text-xs text-muted-foreground">Total Credits</div>

          <div className="text-md md:text-lg font-semibold text-primary">
            {totalCredits}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-5 py-3 text-left text-[9px] md:text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Course
              </th>
              <th className="px-5 py-3 text-left text-[9px] md:text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Faculty Selection
              </th>
              <th className="px-5 py-3 text-center text-[9px] md:text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Credits
              </th>
            </tr>
          </thead>

          <tbody>
            {selectedFaculty.map((selection) => {
              const course = selectedCourses.find(
                (course) => course.code === selection.courseCode,
              );
              return (
                <tr
                  key={selection.courseCode}
                  className="border-b border-border/60 bg-card transition-colors hover:bg-muted/20 last:border-none"
                >
                  <td className="pl-5 py-4 align-top">
                    <div className="font-semibold text-[14px] md:text-md text-foreground">
                      {selection.courseCode}
                    </div>
                    <div className="md: mt-1 text-[10px] md:text-xs text-muted-foreground">
                      {course?.name}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-2">
                      {selection.theory && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-medium text-primary">
                            Theory
                          </span>
                          <span className="text-[11px] md:text-sm text-foreground">
                            {selection.theory.name}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {selection.theory.slots.map((slot) => (
                              <span
                                key={slot}
                                className="rounded-xs md:rounded-sm bg-muted font-bold md:font-normal px-2 py-0.5 text-[8px] md:text-xs text-foreground"
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selection.lab && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-medium text-secondary">
                            Lab
                          </span>
                          <span className="text-[11px] md:text-sm text-foreground">
                            {selection.lab.name}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {selection.lab.slots.map((slot) => (
                              <span
                                key={slot}
                                className="rounded-xs md:rounded-md bg-muted font-bold md:font-normal px-2 py-0.5 text-[8px] md:text-xs text-foreground"
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center align-top">
                    <span className="rounded-xs md:rounded-md bg-muted px-2.5 py-1 text-[10px] md:text-xs font-medium text-foreground">
                      {course?.credits} Cr
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
