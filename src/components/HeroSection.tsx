import { Check, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseEmail } from "../utils/parseEmail";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const student = parseEmail(email);
      console.log(student);
      sessionStorage.setItem("student", JSON.stringify(student));
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setEmailError(error.message);
      }
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
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 sm:px-6 md:px-10">
      <div className="max-w-2xl relative text-center mb-10 md:mt-0 mt-15">
        <h1 className="mb-3 text-[36px] md:text-[46px] lg:text-[56px] font-bold leading-[1.1] tracking-tight text-foreground">
          Courses. Faculty. Slots. <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            All in one place
          </span>
        </h1>

        <div className="text-sm md:text-md lg:text-md leading-5 text-muted-foreground">
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
      <div className="mx-auto w-full max-w-2xl space-y-5 px-5 md:px-0">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-start"
        >
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="yourname.yybbb####@vitapstudent.ac.in"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onKeyDown={(e) => {
                  const suggestion = "@vitapstudent.ac.in";

                  if (email && !email.includes("@") && e.key === "Tab") {
                    e.preventDefault();
                    setEmail(email + suggestion);
                  }
                }}
                className="h-[42px] w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:ring-offset-1 shadow-sm"
              />

              {email && !email.includes("@") && (
                <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-sm sm:flex">
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

            {email && !email.includes("@") && (
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
            className="h-[42px] shrink-0 cursor-pointer rounded-md bg-primary px-15 text-md font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
          >
            Continue
          </button>
        </form>

        <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">Auto-detected: </p>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-md bg-card px-3 py-1 text-xs text-foreground">
                Name
              </div>
              <div className="rounded-md bg-card px-3 py-1 text-xs text-foreground">
                Branch
              </div>
              <div className="rounded-md bg-card px-3 py-1 text-xs text-foreground">
                Year
              </div>
              <div className="rounded-md bg-card px-3 py-1 text-xs text-foreground">
                Registration Number
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            No... we won't be saving any data, so don't worry ;)
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 xl:hidden"></div>
    </section>
  );
}
