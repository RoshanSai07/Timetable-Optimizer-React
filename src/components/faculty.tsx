import { useState } from "react";
import {
  Swords,
  Search,
  ChevronDown,
  FlaskConical,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import type { Student } from "../types/student";
import type { Course } from "../types/course";
import { faculty } from "../data/faculty";
import { detectClashes } from "../utils/clashDetection";
import FacultyCard from "../components/FacultyCard";
import ConfirmDialog from "./ConfirmDialog";
type FacultyProps = {
  currentSection?: string;
  setCurrentSection?: React.Dispatch<React.SetStateAction<string>>;
};
type FacultyMember = {
  name: string;
  slots: string[];
};
type SelectedFaculty = {
  courseCode: string;
  theory: FacultyMember | null;
  lab: FacultyMember | null;
};
export default function Faculty({ setCurrentSection }: FacultyProps) {
  const [theorySearch, setTheorySearch] = useState("");
  const [labSearch, setLabSearch] = useState("");
  const [theorySortField, setTheorySortField] = useState("name");
  const [theorySortOrder, setTheorySortOrder] = useState("asc");
  const [labSortField, setLabSortField] = useState("name");
  const [labSortOrder, setLabSortOrder] = useState("asc");
  const [showClearCourses, setShowClearCourses] = useState(false);

  const [selectedCourses] = useState<Course[]>(() => {
    return JSON.parse(sessionStorage.getItem("selectedCourses") || "[]");
  });
  const [activeCourse, setActiveCourse] = useState<Course | null>(
    selectedCourses[0] || null,
  );
  const [selectedFaculty, setSelectedFaculty] = useState<SelectedFaculty[]>(
    () => {
      return JSON.parse(sessionStorage.getItem("selectedFaculty") || "[]");
    },
  );
  const student: Student = JSON.parse(
    sessionStorage.getItem("student") || "{}",
  );
  const facultyData = activeCourse
    ? faculty[student.yearLabel][student.branch]?.[activeCourse.code]
    : null;
  const processFaculty = (
    facultyList: FacultyMember[],
    query: string,
    sortField: string,
    sortOrder: string,
  ) => {
    const normalizedQuery = query.toLowerCase().trim();
    const searchTokens = normalizedQuery.split(" ");
    const filteredFaculty = facultyList.filter((faculty) => {
      const searchableText = `
          ${faculty.name}
          ${faculty.slots.join(" ")}
        `.toLowerCase();
      return searchTokens.every((token) => searchableText.includes(token));
    });
    const sortedFaculty = [...filteredFaculty];
    if (sortField === "name") {
      sortedFaculty.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    }
    if (sortField === "slots") {
      sortedFaculty.sort((a, b) => {
        const slotA = a.slots[0] || "";
        const slotB = b.slots[0] || "";
        return sortOrder === "asc"
          ? slotA.localeCompare(slotB)
          : slotB.localeCompare(slotA);
      });
    }
    return sortedFaculty;
  };
  const theoryFaculty = facultyData
    ? processFaculty(
        facultyData.theory,
        theorySearch,
        theorySortField,
        theorySortOrder,
      )
    : [];
  const labFaculty = facultyData
    ? processFaculty(facultyData.lab, labSearch, labSortField, labSortOrder)
    : [];
  const selectFaculty = (faculty: FacultyMember, type: "theory" | "lab") => {
    if (!activeCourse) return;
    const existingCourse = selectedFaculty.find(
      (item) => item.courseCode === activeCourse.code,
    );
    const currentSelection =
      type === "theory" ? existingCourse?.theory : existingCourse?.lab;
    const isSameFaculty =
      currentSelection?.name === faculty.name &&
      JSON.stringify(currentSelection.slots) === JSON.stringify(faculty.slots);
    const updatedSelections = selectedFaculty.filter(
      (item) => item.courseCode !== activeCourse.code,
    );
    const updatedCourse: SelectedFaculty = {
      courseCode: activeCourse.code,
      theory:
        type === "theory"
          ? isSameFaculty
            ? null
            : faculty
          : existingCourse?.theory || null,

      lab:
        type === "lab"
          ? isSameFaculty
            ? null
            : faculty
          : existingCourse?.lab || null,
    };
    if (updatedCourse.theory || updatedCourse.lab) {
      updatedSelections.push(updatedCourse);
    }
    setSelectedFaculty(updatedSelections);
    sessionStorage.setItem(
      "selectedFaculty",
      JSON.stringify(updatedSelections),
    );
  };
  const flattenedSelections = selectedFaculty.flatMap((course) => {
    const selections = [];
    if (course.theory) {
      selections.push({
        courseCode: course.courseCode,
        facultyName: course.theory.name,
        slots: course.theory.slots,
      });
    }
    if (course.lab) {
      selections.push({
        courseCode: course.courseCode,
        facultyName: course.lab.name,
        slots: course.lab.slots,
      });
    }
    return selections;
  });
  const clashes = detectClashes(flattenedSelections);
  const conflictingSlots = new Set(clashes.flatMap((clash) => clash.slots));
  const hasConflict = (courseCode: string) => {
    return clashes.some((clash) => clash.courses.includes(courseCode));
  };
  const isSelectedFaculty = (
    facultyName: string,
    slots: string[],
    type: "theory" | "lab",
  ) => {
    const currentCourse = selectedFaculty.find(
      (faculty) => faculty.courseCode === activeCourse?.code,
    );
    if (!currentCourse) return false;
    const selected =
      type === "theory" ? currentCourse.theory : currentCourse.lab;
    return (
      selected?.name === facultyName &&
      JSON.stringify(selected.slots) === JSON.stringify(slots)
    );
  };
  const isCourseCompleted = (courseCode: string) => {
    const facultyData =
      faculty[student.yearLabel][student.branch]?.[courseCode];
    const selected = selectedFaculty.find(
      (faculty) => faculty.courseCode === courseCode,
    );
    if (!facultyData || !selected) return false;
    const needsTheory = facultyData.theory.length > 0;
    const needsLab = facultyData.lab.length > 0;
    const hasTheory = !needsTheory || selected.theory;
    const hasLab = !needsLab || selected.lab;
    return hasTheory && hasLab;
  };
  const completedCourses = selectedCourses.filter((course) =>
    isCourseCompleted(course.code),
  ).length;
  const readyForTimetable =
    completedCourses === selectedCourses.length && clashes.length === 0;
  const isFacultyInConflict = (
    faculty: FacultyMember,
    type: "theory" | "lab",
  ) => {
    if (!activeCourse) return false;
    const currentCourse = selectedFaculty.find(
      (course) => course.courseCode === activeCourse.code,
    );
    const selected =
      type === "theory" ? currentCourse?.theory : currentCourse?.lab;
    if (!selected) return false;
    const isCurrentSelection =
      selected.name === faculty.name &&
      JSON.stringify(selected.slots) === JSON.stringify(faculty.slots);
    if (!isCurrentSelection) return false;
    return faculty.slots.some((slot) => conflictingSlots.has(slot));
  };
  const activeSelection = selectedFaculty.find(
    (faculty) => faculty.courseCode === activeCourse?.code,
  );
  const isSlotConflicting = (slot: string) => conflictingSlots.has(slot);
  return (
    <section className="flex flex-1 items-start justify-center px-20 py-20">
      <div className="w-full max-w-7xl space-y-5">
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Choose Teachers
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Select instructor & slot for each course
          </p>
          <button
            onClick={() => setCurrentSection?.("courses")}
            className=" absolute top-0 right-5 cursor-pointer rounded-md flex gap-2 items-center border border-border px-5 py-2 text-sm font-medium text-foreground/70 transition-all hover:text-foreground hover:border-primary/20"
          >
            <ArrowLeft className="text-forground w-5 h-5" />
            <div>Back</div>
          </button>
        </div>
        {clashes.length > 0 && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
            <div className="flex items-center gap-3">
              <Swords className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-bold text-destructive">
                {clashes.length} conflict detected
              </h2>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {clashes.map((clash) => (
                <div
                  key={clash.courses.join("-")}
                  className="flex items-center gap-3"
                >
                  <div className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-white">
                    {clash.slots.join(", ")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {clash.courses.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {readyForTimetable ? (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-start justify-between gap-10">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Schedule ready
                </h2>
                <p className="mt-1 text-muted-foreground">
                  All faculty selections are complete and clash-free.
                </p>
              </div>
              <button
                onClick={() => setCurrentSection?.("timetable")}
                className="cursor-pointer rounded-md flex gap-2 items-center bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
              >
                <div>Continue</div>
                <ArrowRight className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Complete all faculty selections
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select both theory and lab faculty for every course to
                  continue.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-5">
            <div className="flex gap-2 overflow-x-auto">
              {selectedCourses.map((course) => {
                const completed = isCourseCompleted(course.code);
                const conflict = hasConflict(course.code);
                return (
                  <button
                    key={course.code}
                    onClick={() => setActiveCourse(course)}
                    className={`cursor-pointer flex items-center gap-2 border border-border/70 rounded-md px-4 py-2 text-sm font-medium transition-all
                        ${
                          activeCourse?.code === course.code
                            ? "bg-primary text-primary-foreground"
                            : conflict
                              ? "text-destructive"
                              : completed
                                ? "text-primary"
                                : "text-foreground hover:bg-muted/50"
                        }`}
                  >
                    <span>{course.code}</span>
                    {completed && !conflict && (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {conflict && <AlertCircle className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowClearCourses(true)}
              className="cursor-pointer rounded-md border border-border px-6 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive/4 hover:border-destructive/20 hover:text-destructive"
            >
              Clear All
            </button>
            <ConfirmDialog
              open={showClearCourses}
              title="Clear Selected Courses?"
              description="This will remove all selected faculty preferences for your courses. Your course selections will remain unchanged"
              confirmText="Clear Courses"
              onCancel={() => setShowClearCourses(false)}
              onConfirm={() => {
                setSelectedFaculty([]);
                sessionStorage.removeItem("selectedFaculty");
                setShowClearCourses(false);
              }}
            />
          </div>
          <div className="border-b border-border p-6">
            <div className="flex items-start justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {activeCourse?.code}
                  </h2>

                  <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {activeCourse?.credits} Credits
                  </div>
                </div>

                <p className="text-base text-muted-foreground">
                  {activeCourse?.name}
                </p>
              </div>

              <div className="flex gap-4">
                {activeSelection?.theory && (
                  <div className="w-[200px] rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      Theory Faculty
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {activeSelection.theory.name}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {activeSelection.theory.slots.map((slot) => (
                        <span
                          key={slot}
                          className={`rounded-md border px-2 py-0.5 text-xs ${
                            isSlotConflicting(slot)
                              ? "border-destructive/30 bg-destructive/10 text-destructive"
                              : "border-primary/20 bg-primary/10 text-primary"
                          }`}
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSelection?.lab && (
                  <div className="w-[200px] rounded-lg border border-border bg-muted/30 p-3">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                      Lab Faculty
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {activeSelection.lab.name}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {activeSelection.lab.slots.map((slot) => (
                        <span
                          key={slot}
                          className={`rounded-md border px-2 py-0.5 text-xs ${
                            isSlotConflicting(slot)
                              ? "border-destructive/30 bg-destructive/10 text-destructive"
                              : "border-secondary/20 bg-secondary/10 text-secondary"
                          }`}
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Theory Faculty
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select theory instructors
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={theorySearch}
                  onChange={(e) => setTheorySearch(e.target.value)}
                  placeholder="Search theory teachers..."
                  className="h-11 w-full rounded-md border border-input bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div className="relative">
                <select
                  value={theorySortField}
                  onChange={(e) => setTheorySortField(e.target.value)}
                  className="h-11 appearance-none rounded-md border border-input bg-background px-4 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                >
                  <option value="name">Name</option>
                  <option value="slots">Slots</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select
                  value={theorySortOrder}
                  onChange={(e) => setTheorySortOrder(e.target.value)}
                  className="h-11 appearance-none rounded-md border border-input bg-background px-4 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {theoryFaculty.map((faculty) => (
                <FacultyCard
                  key={`${faculty.name}-${faculty.slots.join("-")}`}
                  faculty={faculty}
                  type="theory"
                  selected={isSelectedFaculty(
                    faculty.name,
                    faculty.slots,
                    "theory",
                  )}
                  conflict={isFacultyInConflict(faculty, "theory")}
                  onSelect={() => selectFaculty(faculty, "theory")}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-border p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10">
                <FlaskConical className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Lab Faculty
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select lab instructors
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={labSearch}
                  onChange={(e) => setLabSearch(e.target.value)}
                  placeholder="Search lab teachers..."
                  className="h-11 w-full rounded-md border border-input bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div className="relative">
                <select
                  value={labSortField}
                  onChange={(e) => setLabSortField(e.target.value)}
                  className="h-11 appearance-none rounded-md border border-input bg-background px-4 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                >
                  <option value="name">Name</option>
                  <option value="slots">Slots</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select
                  value={labSortOrder}
                  onChange={(e) => setLabSortOrder(e.target.value)}
                  className="h-11 appearance-none rounded-md border border-input bg-background px-4 pr-10 text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {labFaculty.map((faculty) => (
                <FacultyCard
                  key={`${faculty.name}-${faculty.slots.join("-")}`}
                  faculty={faculty}
                  type="lab"
                  selected={isSelectedFaculty(
                    faculty.name,
                    faculty.slots,
                    "lab",
                  )}
                  conflict={isFacultyInConflict(faculty, "lab")}
                  onSelect={() => selectFaculty(faculty, "lab")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
