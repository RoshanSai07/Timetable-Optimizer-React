import { Search, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { courses } from "../data/courses";
import type { Student } from "../types/student";
import CourseCard from "../components/CourseCard";
import type { Course } from "../types/course";
import ConfirmDialog from "./ConfirmDialog";

type CourseProps = {
  currentSection?: string;
  setCurrentSection?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Courses({
  currentSection,
  setCurrentSection,
}: CourseProps) {
  const student: Student = JSON.parse(
    sessionStorage.getItem("student") || "{}",
  );
  const availableCourses = courses[student.yearLabel][student.branch] || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>(() => {
    return JSON.parse(sessionStorage.getItem("selectedCourses") || "[]");
  });
  const [showClearCourses, setShowClearCourses] = useState(false);
  const toggleCourse = (course: Course) => {
    const alreadySelected = selectedCourses.some(
      (selected) => selected.code === course.code,
    );
    let updatedCourses: Course[];
    if (alreadySelected) {
      updatedCourses = selectedCourses.filter(
        (selected) => selected.code !== course.code,
      );
      const selectedFaculty = JSON.parse(
        sessionStorage.getItem("selectedFaculty") || "[]",
      );
      const updatedFaculty = selectedFaculty.filter(
        (faculty: { courseCode: string }) => faculty.courseCode !== course.code,
      );
      sessionStorage.setItem("selectedFaculty", JSON.stringify(updatedFaculty));
    } else {
      updatedCourses = [...selectedCourses, course];
    }
    setSelectedCourses(updatedCourses);
    sessionStorage.setItem("selectedCourses", JSON.stringify(updatedCourses));
  };
  const filteredCourses = availableCourses.filter((course) => {
    const notSelected = !selectedCourses.some(
      (selected) => selected.code === course.code,
    );
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    return notSelected && matchesSearch;
  });
  const totalCredits = selectedCourses.reduce((sum, course) => {
    return sum + course.credits;
  }, 0);
  const clearAllCourses = () => {
    setSelectedCourses([]);

    sessionStorage.setItem("selectedCourses", "[]");
    sessionStorage.setItem("selectedFaculty", "[]");
  };
  return (
    <section className="flex flex-1 items-start justify-center px-5 pt-15 pb-5 sm:px-8 md:px-10 lg:px-20 lg:py-20">
      <div className="w-full max-w-7xl space-y-6 md:space-y-8">
        <div className="space-y-1">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-foreground">
            Let’s organize your semester
          </h1>
          <p className="max-w-2xl text-xs md:text-md md:leading-5 text-muted-foreground">
            Start by selecting the courses you want to enroll in
          </p>
        </div>
        {selectedCourses.length > 0 && (
          <div className="rounded-md md:rounded-lg border border-border bg-card p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-md md:text-xl font-semibold text-foreground">
                  {selectedCourses.length} course
                  {selectedCourses.length > 1 && "s"} selected
                </h2>
                <p className="text-[14px] md:text-md md:mt-1 text-muted-foreground">
                  {totalCredits} credits
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setShowClearCourses(true)}
                  className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-md border border-border text-xs md:text-sm font-medium text-destructive transition-all hover:border-destructive/20 hover:bg-destructive/5"
                >
                  Clear All
                </button>
                <ConfirmDialog
                  open={showClearCourses}
                  title="Clear Selected Courses?"
                  description="This will remove all selected courses and any related faculty selections"
                  confirmText="Clear Courses"
                  onCancel={() => setShowClearCourses(false)}
                  onConfirm={() => {
                    clearAllCourses();
                    setShowClearCourses(false);
                  }}
                />

                <button
                  onClick={() => setCurrentSection?.("faculty")}
                  className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <div>Continue</div>
                  <ArrowRight className="text-white w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-5 flex flex-wrap gap-1 md:gap-2">
              {selectedCourses.map((course) => {
                return (
                  <button
                    key={course.code}
                    onClick={() => toggleCourse(course)}
                    className="cursor-pointer flex items-center gap-2 rounded-sm md:rounded-md border border-border bg-muted/40 px-2.5 md:px-4 py-2 text-[11px] md:text-sm transition-all hover:bg-muted"
                  >
                    <span className="font-medium">{course.code}</span>
                    <X className="text-foreground w-3 h-3 md:w-4 md:h-4" />
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end mt-5 md:hidden items-center gap-2">
              <button
                onClick={() => setShowClearCourses(true)}
                className="cursor-pointer h-9 md:h-10 px-4 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md border border-border text-xs md:text-sm font-medium text-destructive transition-all hover:border-destructive/20 hover:bg-destructive/5"
              >
                Clear All
              </button>
              <ConfirmDialog
                open={showClearCourses}
                title="Clear Selected Courses?"
                description="This will remove all selected courses and any related faculty selections"
                confirmText="Clear Courses"
                onCancel={() => setShowClearCourses(false)}
                onConfirm={() => {
                  clearAllCourses();
                  setShowClearCourses(false);
                }}
              />

              <button
                onClick={() => setCurrentSection?.("faculty")}
                className="cursor-pointer h-9 md:h-10 px-5 md:px-6 flex items-center justify-center gap-2 rounded-sm md:rounded-md bg-primary text-xs md:text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <div>Continue</div>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        )}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-3 w-3 md:h-4 md:w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses or course codes..."
            className="w-full rounded-md border border-input bg-card py-3 pl-11 pr-5 text-[12px] md:text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.code}
              code={course.code}
              name={course.name}
              credits={course.credits}
              selected={selectedCourses.some(
                (selected) => selected.code === course.code,
              )}
              onSelect={() => toggleCourse(course)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
