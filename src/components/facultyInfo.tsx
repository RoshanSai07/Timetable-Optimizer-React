import type { Course } from "../types/course";
import type { SelectedFaculty } from "../types/selectedFaculty";

type FacultyInfoProps = {
  selectedCourses: Course[];
  selectedFaculty: SelectedFaculty[];
};

export default function FacultyInfo({
  selectedCourses,
  selectedFaculty,
}: FacultyInfoProps) {
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );
  console.log(selectedFaculty);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/10">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Faculty Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {selectedCourses.length} Courses Selected
          </p>
        </div>

        <div className="rounded-lg bg-card px-4 py-2">
          <div className="text-xs text-muted-foreground">Total Credits</div>

          <div className="text-lg font-semibold text-primary">
            {totalCredits}
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Course
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Faculty Selection
              </th>

              <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
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
                  className="
                    border-b border-border/60
                    bg-card
                    transition-colors
                    hover:bg-muted/20
                    last:border-none
                  "
                >
                  {/* Course */}

                  <td className="px-5 py-4 align-top">
                    <div className="font-semibold text-foreground">
                      {selection.courseCode}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      {course?.name}
                    </div>
                  </td>

                  {/* Faculty */}

                  <td className="px-5 py-4">
                    <div className="space-y-2">
                      {selection.theory && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-primary">
                            Theory
                          </span>

                          <span className="text-sm text-foreground">
                            {selection.theory.name}
                          </span>

                          <div className="flex flex-wrap gap-1">
                            {selection.theory.slots.map((slot) => (
                              <span
                                key={slot}
                                className="
                                    rounded-md
                                    bg-muted
                                    px-2 py-0.5
                                    text-xs
                                    text-foreground
                                  "
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selection.lab && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-secondary">
                            Lab
                          </span>

                          <span className="text-sm text-foreground">
                            {selection.lab.name}
                          </span>

                          <div className="flex flex-wrap gap-1">
                            {selection.lab.slots.map((slot) => (
                              <span
                                key={slot}
                                className="
                                    rounded-md
                                    bg-muted
                                    px-2 py-0.5
                                    text-xs
                                    text-foreground
                                  "
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Credits */}

                  <td className="px-5 py-4 text-center align-top">
                    <span
                      className="
                        rounded-md
                        bg-muted
                        px-2.5 py-1
                        text-xs
                        font-medium
                        text-foreground
                      "
                    >
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
