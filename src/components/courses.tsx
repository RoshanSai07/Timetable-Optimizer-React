import { Search, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { courses } from "../data/courses";
import type { Student } from "../types/student";
import CourseCard from "../components/CourseCard";
import type { Course } from "../types/course";

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
  return (
    <section className="flex flex-1 items-start justify-center px-20 py-20">
      <div className="w-full max-w-7xl space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Let’s organize your semester
          </h1>
          <p className="max-w-2xl text-md leading-7 text-muted-foreground">
            Start by selecting the courses you want to enroll in.
          </p>
        </div>
        {selectedCourses.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {selectedCourses.length} course
                  {selectedCourses.length > 1 && "s"} selected
                </h2>
                <p className="mt-1 text-muted-foreground">
                  {totalCredits} credits
                </p>
              </div>
              <button
                onClick={() => setCurrentSection?.("faculty")}
                className="cursor-pointer rounded-md flex gap-2 items-center bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
              >
                <div>Continue</div>
                <ArrowRight className="text-primary-foreground w-5 h-5" />
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedCourses.map((course) => {
                return (
                  <button
                    key={course.code}
                    onClick={() => toggleCourse(course)}
                    className="cursor-pointer flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm transition-all hover:bg-muted"
                  >
                    <span className="font-medium">{course.code}</span>
                    <X className="text-foreground w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses or course codes..."
            className="w-full rounded-md border border-input bg-card py-3 pl-11 pr-5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
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
