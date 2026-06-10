import Logo from "../assets/logo1.svg";

import { Moon, Sun, BookOpen, Users, Calendar } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

type NavbarProps = {
  loggedIn: boolean;
  currentSection?: string;
  setCurrentSection?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({
  loggedIn,
  currentSection,
  setCurrentSection,
}: NavbarProps) {
  return (
    <div className="flex h-[64px] items-center justify-between border-b border-border bg-background px-12">
      <div className="flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm">
          <img src={Logo} alt="Logo" className="h-9 w-9" />
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Timetable Optimizer
        </h1>
      </div>

      {loggedIn && (
        <div className="hidden items-center gap-8 md:flex">
          <div
            onClick={() => setCurrentSection?.("courses")}
            className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 transition-all ${
              currentSection === "courses"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            <BookOpen
              className={`h-4 w-4 stroke-[2] transition-colors ${
                currentSection === "courses"
                  ? "text-primary-foreground"
                  : "text-primary"
              }`}
            />

            <div
              className={`text-sm font-medium transition-colors ${
                currentSection === "courses"
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Courses
            </div>
          </div>
          <div
            onClick={() => setCurrentSection?.("faculty")}
            className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 transition-all ${
              currentSection === "faculty"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            <Users
              className={`h-4 w-4 stroke-[2] transition-colors ${
                currentSection === "faculty"
                  ? "text-primary-foreground"
                  : "text-primary"
              }`}
            />

            <div
              className={`text-sm font-medium transition-colors ${
                currentSection === "faculty"
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Faculty
            </div>
          </div>
          <div
            onClick={() => setCurrentSection?.("timetable")}
            className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 transition-all ${
              currentSection === "timetable"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            <Calendar
              className={`h-4 w-4 stroke-[2] transition-colors ${
                currentSection === "timetable"
                  ? "text-primary-foreground"
                  : "text-primary"
              }`}
            />

            <div
              className={`text-sm font-medium transition-colors ${
                currentSection === "timetable"
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Timetable
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {loggedIn && <ProfileDropdown />}

        <button className="cursor-pointer group flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:bg-foreground">
          <Moon className="h-5 w-5 stroke-[1.75] text-foreground transition-colors group-hover:text-card" />
        </button>
      </div>
    </div>
  );
}
