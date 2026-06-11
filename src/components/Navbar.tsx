import { useState, useEffect } from "react";
import Logo from "../assets/logo1.svg";
import { getTheme, setTheme } from "../utils/theme";
import { Moon, Sun, BookOpen, Users, Calendar, HelpCircle } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import HelpDialog from "./HelpDialog";

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
  const [theme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [helpOpen, setHelpOpen] = useState(false);
  useEffect(() => {
    setCurrentTheme(getTheme() as "light" | "dark");
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };
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
            className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 transition-all ${
              currentSection === "courses"
                ? "border-primary bg-accent text-primary-foreground"
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
            className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 transition-all ${
              currentSection === "faculty"
                ? "border-primary bg-accent text-primary-foreground"
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
            className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 transition-all ${
              currentSection === "timetable"
                ? "border-primary bg-accent text-primary-foreground"
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
        <button
          onClick={() => setHelpOpen(true)}
          className="cursor-pointer group flex h-10 items-center justify-center gap-2 rounded-md border border-border px-3 text-sm text-foreground transition-all hover:bg-foreground hover:text-card"
        >
          <HelpCircle className="h-5 w-5 stroke-[1.75] text-primary transition-colors group-hover:text-card" />
          <span className="hidden md:inline">Help</span>
        </button>

        {loggedIn && <ProfileDropdown />}

        <button
          onClick={toggleTheme}
          className="cursor-pointer group flex h-10 w-10 items-center justify-center rounded-md border border-border transition-all hover:bg-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 stroke-[1.75] text-foreground transition-colors group-hover:text-card" />
          ) : (
            <Moon className="h-5 w-5 stroke-[1.75] text-foreground transition-colors group-hover:text-card" />
          )}
        </button>
      </div>

      <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
