import { useState, useEffect } from "react";
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
  ArrowUp,
  ArrowUpToLine,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Student } from "@/types/student";
import type { Course } from "@/types/course";
import { detectClashes } from "../engine/clashDetection";
import FacultyCard from "./FacultyCard";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import { useAcademic } from "@/context/AcademicContext";

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
  const { faculty, student } = useAcademic();
  const [theorySearch, setTheorySearch] = useState("");
  const [labSearch, setLabSearch] = useState("");
  const [theorySortField, setTheorySortField] = useState("name");
  const [theorySortOrder, setTheorySortOrder] = useState("asc");
  const [labSortField, setLabSortField] = useState("name");
  const [labSortOrder, setLabSortOrder] = useState("asc");
  const [showClearCourses, setShowClearCourses] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 900 : 700;

      setShowStickyNav((prev) => {
        if (!prev && window.scrollY > threshold) return true;
        if (prev && window.scrollY < threshold - 150) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [selectedCourses] = useState<Course[]>(() => {
    return JSON.parse(sessionStorage.getItem("selectedCourses") || "[]");
  });

  if (selectedCourses.length === 0) {
    return (
      <section className="flex flex-1 items-start justify-center px-8 pt-15 pb-5 sm:px-8 md:px-10 lg:px-20 lg:py-20">
        <div className="w-full max-w-7xl space-y-8">
          <div className="px-1">
            <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-foreground">
              Choose Teachers
            </h1>
            <p className="text-xs text-muted-foreground md:text-base">
              Select instructor & slot for each course
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-md md:text-xl font-semibold text-foreground">
                  No courses selected
                </h2>

                <p className="md:mt-2 text-xs leading-relaxed text-muted-foreground">
                  Start by selecting the courses you plan to register for. Once
                  courses are added, you can choose faculty and generate your
                  timetable.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                <button
                  onClick={() => setCurrentSection?.("courses")}
                  className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Go to Courses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  const [activeCourse, setActiveCourse] = useState<Course | null>(
    selectedCourses[0] || null,
  );
  const [selectedFaculty, setSelectedFaculty] = useState<SelectedFaculty[]>(
    () => {
      return JSON.parse(sessionStorage.getItem("selectedFaculty") || "[]");
    },
  );
  // const student: Student = JSON.parse(
  //   sessionStorage.getItem("student") || "{}",
  // );
  const facultyData = activeCourse ? faculty?.[activeCourse.code] : null;
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
    const facultyData = faculty?.[courseCode];
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
  const currentIndex = selectedCourses.findIndex(
    (course) => course.code === activeCourse?.code,
  );
  const previousCourse =
    currentIndex > 0 ? selectedCourses[currentIndex - 1] : null;
  const nextCourse =
    currentIndex < selectedCourses.length - 1
      ? selectedCourses[currentIndex + 1]
      : null;
  const isSlotConflicting = (slot: string) => conflictingSlots.has(slot);
  return (
    <section className="flex flex-1 items-start justify-center px-5 pt-15 pb-5 sm:px-8 md:px-10 lg:px-20 lg:py-20">
      <div className="w-full max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-foreground">
              Choose Teachers
            </h1>

            <p className="max-w-2xl text-xs leading-5 text-muted-foreground md:text-base">
              Select instructor & slot for each course.
            </p>
          </div>

          <button
            onClick={() => setCurrentSection?.("courses")}
            className="w-full md:w-auto cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md border border-border text-xs md:text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            <span>Back</span>
          </button>
        </div>
        {clashes.length > 0 && (
          <div
            id="clashes-section"
            className="rounded-md md:rounded-lg border border-destructive/30 bg-destructive/5 p-5"
          >
            <div className="flex items-center gap-3">
              <Swords className="h-5 w-5 text-destructive" />
              <h2 className="text-md md:text-xl font-bold text-destructive">
                {clashes.length} conflict detected
              </h2>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {clashes.map((clash) => (
                <div
                  key={clash.courses.join("-")}
                  className="flex items-center gap-3"
                >
                  <div className="rounded-full bg-destructive px-3 py-1 text-[10px] md:text-xs font-semibold text-white">
                    {clash.slots.join(", ")}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {clash.courses.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {readyForTimetable ? (
          <div className="rounded-md md:rounded-lg border border-primary/20 bg-primary/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-primary">
                  Schedule ready
                </h2>
                <p className="md:mt-1 text-xs md:text-[14px] text-muted-foreground">
                  All faculty selections are complete and clash-free
                </p>
              </div>
              <button
                onClick={() => setCurrentSection?.("timetable")}
                className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <div>Continue</div>
                <ArrowRight className="text-white w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-md md:rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex p-2 md:p-3 items-center justify-center rounded-lg bg-muted">
                <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-foreground">
                  Complete all faculty selections
                </h3>
                <p className="md:mt-1 text-[10px] md:text-sm text-muted-foreground">
                  Select both theory and lab faculty for every course to
                  continue
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-5">
            <div className="flex flex-1 flex-wrap gap-2">
              {selectedCourses.map((course) => {
                const completed = isCourseCompleted(course.code);
                const conflict = hasConflict(course.code);
                return (
                  <button
                    key={course.code}
                    onClick={() => setActiveCourse(course)}
                    className={`cursor-pointer flex items-center gap-1 md:gap-2 border border-border/70 rounded-sm md:rounded-md px-4 py-2 text-[11px] md:text-sm font-medium transition-all
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
                      <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
                    )}
                    {conflict && (
                      <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
                    )}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowClearCourses(true)}
              className="shrink-0 cursor-pointer h-9 md:h-10 px-3 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md border border-border text-xs md:text-sm font-medium text-destructive transition-all hover:border-destructive/20 hover:bg-destructive/5"
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
            <div className="md:flex items-start justify-between gap-8">
              <div className="md:space-y-2">
                <div className="flex items-center gap-5">
                  <h2 className="text-lg md:text-2xl font-bold tracking-tight text-foreground">
                    {activeCourse?.code}
                  </h2>

                  <div className="rounded-full border border-border bg-muted px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-muted-foreground">
                    {activeCourse?.credits} Credits
                  </div>
                </div>

                <p className="text-xs md:text-base text-muted-foreground">
                  {activeCourse?.name}
                </p>
              </div>

              <div className="flex gap-4 md:mt-0 mt-4">
                {activeSelection?.theory && (
                  <div className="w-[200px] rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-1 md:mb-2 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-primary">
                      Theory Faculty
                    </div>
                    <div className="text-xs md:text-sm font-medium text-foreground">
                      {activeSelection.theory.name}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {activeSelection.theory.slots.map((slot) => (
                        <span
                          key={slot}
                          className={`rounded-sm border px-2 py-0.5 text-[10px] font-bold md:text-xs ${
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
                  <div className="w-[200px] rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-1 md:mb-2 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-secondary">
                      Lab Faculty
                    </div>
                    <div className="text-xs md:text-sm font-medium text-foreground">
                      {activeSelection.lab.name}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {activeSelection.lab.slots.map((slot) => (
                        <span
                          key={slot}
                          className={`rounded-sm  border px-2 py-0.5 font-bold text-[10px] md:text-xs ${
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
              <div className="flex p-2 md:p-3 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="w-3.5 h-3.5 md:h-4 md:w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-[15px] md:text-lg font-semibold text-foreground">
                  Theory Faculty
                </h3>
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  Select theory instructors
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={theorySearch}
                  onChange={(e) => setTheorySearch(e.target.value)}
                  placeholder="Search theory teachers..."
                  className="h-10 md:h-11 w-full rounded-md border border-input bg-card pl-11 pr-4 text-xs md:text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative flex-[28]">
                  <select
                    value={theorySortField}
                    onChange={(e) => setTheorySortField(e.target.value)}
                    className="h-10 md:h-11 w-full appearance-none rounded-md border border-input bg-card px-4 pr-10 text-xs md:text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="name">Name</option>
                    <option value="slots">Slots</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />
                </div>

                <div className="relative flex-[36]">
                  <select
                    value={theorySortOrder}
                    onChange={(e) => setTheorySortOrder(e.target.value)}
                    className="h-10 md:h-11 w-full appearance-none rounded-md border border-input bg-card px-4 pr-10 text-xs md:text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="max-h-[350px] md:max-h-[500px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
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
          </div>

          <div className="space-y-4 border-t border-border p-6">
            <div className="flex items-center gap-3">
              <div className="flex p-2 md:p-3 items-center justify-center rounded-xl bg-secondary/10">
                <FlaskConical className="h-3.5 w-3.5 md:h-4 md:w-4 text-secondary" />
              </div>
              <div>
                <h3 className="text-[15px] md:text-lg font-semibold text-foreground">
                  Lab Faculty
                </h3>
                <p className="text-[10px]  md:text-sm text-muted-foreground">
                  Select lab instructors
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={labSearch}
                  onChange={(e) => setLabSearch(e.target.value)}
                  placeholder="Search lab teachers..."
                  className="h-10 md:h-11 w-full rounded-md border border-input bg-card pl-11 pr-4 text-xs md:text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="flex gap-2">
                <div className="relative flex-[28]">
                  <select
                    value={labSortField}
                    onChange={(e) => setLabSortField(e.target.value)}
                    className="h-10 md:h-11 w-full appearance-none rounded-md border border-input bg-card px-4 pr-10 text-xs md:text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="name">Name</option>
                    <option value="slots">Slots</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />
                </div>

                <div className="relative flex-[36]">
                  <select
                    value={labSortOrder}
                    onChange={(e) => setLabSortOrder(e.target.value)}
                    className="h-10 md:h-11 w-full appearance-none rounded-md border border-input bg-card px-4 pr-10 text-xs md:text-sm outline-none transition-all focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="max-h-[350px] md:max-h-[500px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
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

        <AnimatePresence>
          {showStickyNav && (
            <>
              <div className="sticky bottom-2 z-50 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 100, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  className="hidden md:flex z-50 w-[700px] max-w-[90vw] items-center gap-2 rounded-md border border-border bg-background/85 backdrop-blur-xl p-1"
                >
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="cursor-pointer flex h-9 w-10 shrink-0 items-center justify-center rounded-sm border border-border bg-card transition-all hover:bg-muted"
                  >
                    <ArrowUpToLine className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() =>
                      previousCourse && setActiveCourse(previousCourse)
                    }
                    disabled={!previousCourse}
                    className="cursor-pointer flex-1 flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {previousCourse?.code ?? "First"}
                  </button>

                  {clashes.length > 0 ? (
                    <button
                      onClick={() =>
                        document
                          .getElementById("clashes-section")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                      }
                      className="cursor-pointer flex-1 flex h-10 items-center justify-center gap-2 rounded-md bg-destructive px-4 text-sm text-white"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                      Resolve {clashes.length} Conflict
                      {clashes.length > 1 ? "s" : ""}
                    </button>
                  ) : (
                    <button
                      disabled={!readyForTimetable}
                      onClick={() => {
                        setCurrentSection?.("timetable");
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="cursor-pointer flex-1 h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90"
                    >
                      {readyForTimetable
                        ? "Generate Timetable"
                        : `${completedCourses}/${selectedCourses.length} Complete`}
                    </button>
                  )}

                  <button
                    onClick={() => nextCourse && setActiveCourse(nextCourse)}
                    disabled={!nextCourse}
                    className="cursor-pointer flex-1 flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {nextCourse?.code ?? "Last"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                }}
                className="md:hidden sticky bottom-2 left-4 right-4 z-50 space-y-2 rounded-md border border-border bg-background/85 backdrop-blur-xl p-1"
              >
                <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="cursor-pointer flex h-9 w-15 items-center justify-center rounded-sm border border-border bg-card p-2 transition-all hover:bg-muted"
                  >
                    <ArrowUpToLine className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      previousCourse && setActiveCourse(previousCourse)
                    }
                    disabled={!previousCourse}
                    className="cursor-pointer flex h-9 items-center justify-center gap-1 rounded-sm border border-border bg-card px-2 text-xs font-medium transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {previousCourse?.code ?? "Start"}
                  </button>

                  <button
                    onClick={() => nextCourse && setActiveCourse(nextCourse)}
                    disabled={!nextCourse}
                    className="cursor-pointer flex h-9 items-center justify-center gap-1 rounded-sm border border-border bg-card px-2 text-xs font-medium transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {nextCourse?.code ?? "End"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {clashes.length > 0 ? (
                  <button
                    onClick={() =>
                      document
                        .getElementById("clashes-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                    }
                    className="cursor-pointer flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-destructive text-xs font-medium text-white transition-all hover:bg-destructive/90"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                    Resolve {clashes.length} Conflict
                    {clashes.length > 1 ? "s" : ""}
                  </button>
                ) : (
                  <button
                    disabled={!readyForTimetable}
                    onClick={() => setCurrentSection?.("timetable")}
                    className="cursor-pointer h-9 w-full rounded-sm bg-primary text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {readyForTimetable
                      ? "Generate Timetable"
                      : `Faculty ${completedCourses}/${selectedCourses.length}`}
                  </button>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
