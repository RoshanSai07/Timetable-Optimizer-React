import { useState, useEffect } from "react";
import Logo from "../assets/logo1.svg";
import { getTheme, setTheme } from "../utils/theme";
import {
  Moon,
  Sun,
  BookOpen,
  Users,
  Calendar,
  HelpCircle,
  Menu,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import HelpDialog from "./HelpDialog";
import { motion, AnimatePresence } from "framer-motion";
import MobileSidebar from "./MobileSidebar";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const navItems = [
    {
      id: "courses",
      label: "Courses",
      icon: BookOpen,
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: Users,
    },
    {
      id: "timetable",
      label: "Timetable",
      icon: Calendar,
    },
  ];
  return (
    <div className="border-b border-border bg-background">
      <div className="flex h-[64px] items-center justify-between px-6 md:px-12">
        <div className="flex items-center justify-center gap-1 lg:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm">
            <img
              src={Logo}
              alt="Logo"
              className="h-7 w-7 md:h-8 md:w-8 xl:h-9 xl:w-9"
            />
          </div>

          <h1 className="text-md sm:text-lg mt-1 lg:text-xl font-semibold tracking-tight text-foreground">
            Timetable Optimizer
          </h1>
        </div>

        {loggedIn && (
          <div className="hidden items-center gap-8 md:flex">
            <div
              onClick={() => setCurrentSection?.("courses")}
              className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-border/50 px-3 transition-all ${
                currentSection === "courses"
                  ? "bg-accent text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
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
              className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-border/50 px-3 transition-all ${
                currentSection === "faculty"
                  ? "bg-accent text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
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
              className={`group flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-border/50 px-3 transition-all ${
                currentSection === "timetable"
                  ? "bg-accent text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
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

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setHelpOpen(true)}
            className="cursor-pointer group flex h-10 items-center justify-center gap-2 rounded-md border border-border px-3 text-sm text-foreground transition-all hover:bg-accent hover:text-white"
          >
            <HelpCircle className="h-5 w-5 stroke-[1.75] text-primary transition-colors group-hover:text-white" />
            <span className="hidden md:inline">Help</span>
          </button>

          {loggedIn && <ProfileDropdown />}

          <button
            onClick={toggleTheme}
            className="cursor-pointer group flex h-10 w-10 items-center justify-center rounded-md border border-border transition-all hover:bg-foreground"
          >
            <motion.div
              animate={{
                rotate: theme === "dark" ? 180 : 0,
              }}
              transition={{
                duration: 0.15,
                ease: "linear",
              }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 stroke-[1.75] text-foreground transition-colors group-hover:text-card" />
              ) : (
                <Moon className="h-5 w-5 stroke-[1.75] text-foreground transition-colors group-hover:text-card" />
              )}
            </motion.div>
          </button>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden cursor-pointer flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {loggedIn && (
        <div className="md:hidden border-t border-border p-1 px-2">
          <div className="grid grid-cols-3 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection?.(item.id)}
                  className={`flex h-9 items-center justify-center gap-2 rounded-md border border-border/50 px-2 transition-all ${
                    currentSection === item.id
                      ? "bg-accent text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      currentSection === item.id
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`}
                  />

                  <span
                    className={`text-[13px] font-medium ${
                      currentSection === item.id
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        loggedIn={loggedIn}
        currentSection={currentSection || "courses"}
        setCurrentSection={setCurrentSection!}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
