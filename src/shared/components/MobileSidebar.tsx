import {
  X,
  BookOpen,
  Users,
  Calendar,
  PlayCircle,
  LogOut,
  Moon,
  Sun,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RegistrationGuideDialog from "./DemoDialog";
import HelpDialog from "./HelpDialog";
import { useState, useEffect } from "react";
import { courses } from "@/data/courses";
import type { Student } from "@/types/student";
import type { Course } from "@/types/course";

import {
  formatName,
  formatYearLabel,
  formatRegNo,
} from "@/utils/formatStudent";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  loggedIn: boolean;
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
  loggedIn,
  currentSection,
  setCurrentSection,
  theme,
  toggleTheme,
}: MobileSidebarProps) {
  const navigate = useNavigate();
  const [registrationGuideOpen, setRegistrationGuideOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const student: Student = JSON.parse(
    sessionStorage.getItem("student") || "{}",
  );
  useEffect(() => {
    if (open) {
      setSelectedCourses(
        JSON.parse(sessionStorage.getItem("selectedCourses") || "[]"),
      );
    }
  }, [open]);
  const totalCredits = selectedCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // const navItems = [
  //   {
  //     id: "courses",
  //     label: "Courses",
  //     icon: BookOpen,
  //   },
  //   {
  //     id: "faculty",
  //     label: "Faculty",
  //     icon: Users,
  //   },
  //   {
  //     id: "timetable",
  //     label: "Timetable",
  //     icon: Calendar,
  //   },
  // ];
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              className="fixed right-0 top-0 z-50 flex h-screen w-[320px] max-w-[85vw] flex-col border-l border-border bg-card"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 250,
              }}
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    Menu
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {loggedIn && (
                  <div className="border-b border-border p-4">
                    <div className="flex justify-between">
                      <div className="text-base font-semibold text-foreground">
                        {formatName(student.name)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {student.branch} • {formatYearLabel(student.yearLabel)}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {formatRegNo(student.regNo)}
                    </div>
                  </div>
                )}
                {loggedIn && (
                  <div className="grid grid-cols-2 gap-3 border-b border-border p-4">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">
                        Courses
                      </div>
                      <div className="mt-1 text-xl font-semibold">
                        {selectedCourses.length}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">
                        Credits
                      </div>
                      <div className="mt-1 text-xl font-semibold">
                        {totalCredits}
                      </div>
                    </div>
                  </div>
                )}
                {/* {loggedIn && (
                  <div className="border-b border-border p-4">
                    <div className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Navigation
                    </div>
                    <div className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setCurrentSection(item.id);
                            }}
                            className={`flex h-10 w-full items-center gap-3 rounded-md px-4 transition-all ${
                              currentSection === item.id
                                ? "bg-accent text-primary-foreground"
                                : "cursor-pointer hover:bg-muted"
                            }`}
                          >
                            <Icon className="h-4 w-4" />

                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )} */}
                <div className="border-b border-border p-4">
                  <div className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Tools
                  </div>

                  <div className="space-y-1">
                    {loggedIn && (
                      <button
                        onClick={() => {
                          setRegistrationGuideOpen(true);
                          onClose();
                        }}
                        className="cursor-pointer flex h-10 w-full items-center gap-3 rounded-md px-4 transition-all hover:bg-muted"
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Registration Guide
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setHelpOpen(true);
                        onClose();
                      }}
                      className="cursor-pointer flex h-10 w-full items-center gap-3 rounded-md px-4 transition-all hover:bg-muted"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Help</span>
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="cursor-pointer flex h-10 w-full items-center gap-3 rounded-md px-4 transition-all hover:bg-muted"
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>
                  </div>
                  {loggedIn && (
                    <div className="border-t border-border px-4 py-2">
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer flex h-10 w-full items-center gap-3 rounded-md text-destructive transition-all hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <RegistrationGuideDialog
        open={registrationGuideOpen}
        onClose={() => setRegistrationGuideOpen(false)}
      />
      <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
