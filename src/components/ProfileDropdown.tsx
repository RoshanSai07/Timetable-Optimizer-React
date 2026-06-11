import {
  User,
  ChevronDown,
  Info,
  PlayCircle,
  LogOut,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import type { Student } from "../types/student";
import type { Course } from "../types/course";
import RegistrationGuideDialog from "./DemoDialog";
import {
  formatName,
  formatYearLabel,
  formatRegNo,
} from "../utils/formatStudent";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [registrationGuideOpen, setRegistrationGuideOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const student: Student = JSON.parse(
    sessionStorage.getItem("student") || "{}",
  );
  const selectedCourses: Course[] = JSON.parse(
    sessionStorage.getItem("selectedCourses") || "[]",
  );
  const availableCourses = courses[student.yearLabel][student.branch] || [];
  const totalCredits = selectedCourses.reduce((sum, course) => {
    return sum + course.credits;
  }, 0);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer group flex h-10 items-center justify-center gap-3 rounded-md border border-border px-4 transition-all hover:bg-accent"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 group-hover:bg-card/10">
          <User className="h-4 w-4 stroke-[2] text-primary transition-colors group-hover:text-card" />
        </div>
        <span className="text-sm font-medium text-foreground transition-colors group-hover:text-card">
          {formatName(student.name)}
        </span>
        <ChevronDown
          className={`h-4 w-4 stroke-[2] text-muted-foreground transition-colors group-hover:text-card ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`absolute right-0 top-14 z-50 w-64 origin-top-right rounded-lg border border-border/60 bg-card/95 backdrop-blur-md p-2 shadow-md transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-[-6px] scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-border p-2">
          <div className="text-md font-bold text-foreground">
            {formatName(student.name)}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {student.branch} • {formatYearLabel(student.yearLabel)}{" "}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {formatRegNo(student.regNo)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            <div className="mt-1 text-lg font-semibold text-foreground">
              {selectedCourses.length}
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Credits</div>
            </div>
            <div className="mt-1 text-lg font-semibold text-foreground">
              {totalCredits}
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-1 py-2">
          <button
            onClick={() => {
              setRegistrationGuideOpen(true);
              setOpen(false);
            }}
            className="cursor-pointer group flex h-9 items-center gap-3 rounded-lg px-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <PlayCircle className="h-4 w-4 stroke-[2]" />
            <span>Registration Guide</span>
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer group flex h-9 items-center gap-3 rounded-lg px-2 text-sm text-destructive transition-all hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 stroke-[2]" />
            <span>Logout</span>
          </button>
        </div>
      </div>{" "}
      <RegistrationGuideDialog
        open={registrationGuideOpen}
        onClose={() => setRegistrationGuideOpen(false)}
      />
    </div>
  );
}
