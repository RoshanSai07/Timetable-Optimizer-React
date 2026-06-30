import { Check, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseEmail } from "../engine/parseEmail";
import { motion } from "framer-motion";
import { EmailParseAnimation } from "./EmailParseAnimation";
import { availablePrograms } from "@/data/courses";
import { useAcademic } from "@/context/AcademicContext";
import { initializeStudentSession } from "../engine/initializeStudentSession";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [parsedStudent, setParsedStudent] = useState<any>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { setStudent, setFaculty } = useAcademic();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    let finalEmail = email;

    if (isMobile) {
      finalEmail = username.includes("@")
        ? username
        : `${username}@vitapstudent.ac.in`;
    }

    try {
      // const student = parseEmail(finalEmail);
      // sessionStorage.setItem("student", JSON.stringify(student));
      // navigate("/dashboard");
      const student = parseEmail(finalEmail);

      const matchedProgram = availablePrograms.find(
        (program) =>
          program.year === student.yearLabel &&
          program.branch === student.branch,
      );

      if (!matchedProgram) {
        navigate("/not-supported");
        return;
      }

      setSubmittedEmail(finalEmail);
      setParsedStudent(student);
      requestAnimationFrame(() => {
        setShowAnimation(true);
      });
    } catch (error) {
      setLoading(false);

      if (error instanceof Error) {
        setEmailError(error.message);
      }
    }
  };

  const completeLogin = async () => {
    try {
      await initializeStudentSession(parsedStudent, {
        setStudent,
        setFaculty,
      });

      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  function FeatureCard({
    icon,
    title,
    subtitle,
    description,
    className = "",
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    className?: string;
  }) {
    return (
      <div
        className={`rounded-lg border border-border bg-card/90 p-4 shadow-md ${className}`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-primary/5 p-3">
          <div className="text-sm font-medium text-primary">{description}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showAnimation && parsedStudent && (
        <EmailParseAnimation
          email={submittedEmail}
          parsed={{
            name: parsedStudent.name,
            branch: parsedStudent.branch,
            year: parsedStudent.yearLabel,
            regNum: parsedStudent.regNo,
            academicYear: parsedStudent.academicYear,
          }}
          onComplete={completeLogin}
          onSkip={completeLogin}
        />
      )}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 sm:px-6 md:px-10">
        <div className="max-w-2xl relative text-center mb-10 md:mt-0 mt-15">
          <h1 className="md:mb-2 text-[30px] md:text-[46px] lg:text-[54px] font-bold leading-[1.1] tracking-tight text-foreground">
            Courses. Faculty. Slots. <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              All in one place
            </span>
          </h1>

          <div className="text-[12px] md:text-md lg:text-md leading-5 text-muted-foreground">
            Plan your semester, compare teachers, and build your timetable with
            confidence.
          </div>

          <motion.div className="hidden xl:block absolute -left-[55%] -bottom-[155%]">
            <FeatureCard
              className="w-64"
              icon={
                <div className="rounded-sm bg-primary/10 p-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              }
              title="Clash Detection"
              subtitle="Real-time validation"
              description="See conflicts in real-time as you build your schedule"
            />
          </motion.div>

          <motion.div className="hidden xl:block absolute -right-[50%] -top-[45%]">
            <FeatureCard
              className="w-60"
              icon={
                <div className="rounded-sm bg-primary/10 p-2">
                  <Download className="h-4 w-4 text-primary" />
                </div>
              }
              title="Export Schedule"
              subtitle="PDF • Image • Share"
              description="Download or share your final timetable"
            />
          </motion.div>
        </div>
        <div className="mx-auto w-full max-w-2xl space-y-5 md:px-5 md:px-0">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-start"
          >
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    isMobile
                      ? "yourname.yybbb####"
                      : "yourname.yybbb####@vitapstudent.ac.in"
                  }
                  value={isMobile ? username : email}
                  onChange={(e) => {
                    if (isMobile) {
                      setUsername(e.target.value);
                    } else {
                      setEmail(e.target.value);
                    }

                    setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (isMobile) return;
                    const suggestion = "@vitapstudent.ac.in";
                    if (email && !email.includes("@") && e.key === "Tab") {
                      e.preventDefault();
                      setEmail(email + suggestion);
                    }
                  }}
                  className={`h-[42px] w-full rounded-md border border-input bg-card px-3 text-[12px] md:text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:ring-offset-1 shadow-sm ${
                    isMobile ? "" : ""
                  }`}
                />

                {isMobile && !username.includes("@") && (
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground/70">
                    @vitapstudent.ac.in
                  </div>
                )}

                {!isMobile && email && !email.includes("@") && (
                  <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-sm">
                    <span className="invisible">{email}</span>

                    <span className="text-muted-foreground/40">
                      @vitapstudent.ac.in
                    </span>
                  </div>
                )}
              </div>

              {emailError && (
                <p className="mt-2 text-xs text-destructive">{emailError}</p>
              )}

              {isMobile && username && !username.includes("@") && (
                <p className="mt-2 text-xs text-muted-foreground">
                  The VIT-AP domain is added automatically
                </p>
              )}

              {!isMobile && email && !email.includes("@") && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">
                    Tab
                  </kbd>{" "}
                  to autocomplete
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer h-10 md:h-[42px] shrink-0 rounded-sm md:rounded-md bg-primary px-15 text-sm md:text-md font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Loading...
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>

          <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-xs md:text-sm text-muted-foreground">
                Auto-detected:
              </p>

              <div className="flex flex-wrap gap-2">
                <div className="rounded-md bg-card px-3 py-1 text-[10px] md:text-xs text-foreground">
                  Name
                </div>
                <div className="rounded-md bg-card px-3 py-1 text-[10px] md:text-xs text-foreground">
                  Branch
                </div>
                <div className="rounded-md bg-card px-3 py-1 text-[10px] md:text-xs text-foreground">
                  Year
                </div>
                <div className="rounded-md bg-card px-3 py-1 text-[10px] md:text-xs text-foreground">
                  Registration Number
                </div>
              </div>
            </div>
            <div className="text-[10px] md:text-xs pl-2 text-muted-foreground">
              No... we won't be saving any data, so don't worry ;)
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
