import { Check, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseEmail } from "../utils/parseEmail";

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
  return (
    <section className="flex flex-1 items-center justify-center px-10">
      <div className="m-auto max-w-xl">
        <h1 className="mb-3 text-[42px] font-bold leading-[1.05] tracking-tight text-foreground">
          Build your timetable with{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            zero conflicts
          </span>
        </h1>

        <div className="text-md leading-7 text-muted-foreground">
          A simple tool for VIT AP students to select courses, choose teachers,
          and avoid schedule clashes.
        </div>

        <div className="mt-8 flex max-w-xl flex-col gap-7 rounded-xl border border-border bg-muted p-7">
          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 stroke-[2] text-primary" />

            <div className="flex flex-col">
              <h1 className="text-md font-medium text-foreground">
                Automatic clash detection
              </h1>

              <p className="text-sm text-muted-foreground">
                See conflicts in real-time as you build your schedule
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 stroke-[2] text-primary" />

            <div className="flex flex-col">
              <h1 className="text-md font-medium text-foreground">
                Compare teachers by slot
              </h1>

              <p className="text-sm text-muted-foreground">
                Choose the best instructor for your preferred time
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 stroke-[2] text-primary" />

            <div className="flex flex-col">
              <h1 className="text-md font-medium text-foreground">
                Export your schedule
              </h1>

              <p className="text-sm text-muted-foreground">
                Download or share your final timetable
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl">
        <div className="w-xl space-y-10 rounded-xl border border-border bg-card p-8 shadow-sm">
          <div>
            <h1 className="text-2xl font-medium text-foreground">
              Get Started
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with your VIT-AP email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <label className="text-xs font-medium text-foreground sm:text-sm">
                College Email
              </label>

              <div className="relative mt-2">
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

                    if (
                      email &&
                      !email.includes("@") &&
                      (e.key === "Tab" || e.key === "ArrowRight")
                    ) {
                      e.preventDefault();
                      setEmail(email + suggestion);
                    }
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:ring-offset-1"
                />

                {email && !email.includes("@") && (
                  <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-sm">
                    <span className="invisible">{email}</span>

                    <span className="text-muted-foreground/40">
                      @vitapstudent.ac.in
                    </span>
                  </div>
                )}
              </div>

              {emailError && (
                <p className="text-xs text-destructive sm:text-sm">
                  {emailError}
                </p>
              )}

              {email && !email.includes("@") && email.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Press{" "}
                  <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">
                    Tab
                  </kbd>{" "}
                  or{" "}
                  <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">
                    →
                  </kbd>{" "}
                  to autocomplete
                </p>
              )}
            </div>

            <button
              type="submit"
              className="h-[42px] w-full cursor-pointer rounded-lg bg-primary text-lg font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Continue
            </button>
          </form>

          <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 stroke-[2] text-muted-foreground" />

              <p className="text-sm text-muted-foreground">
                We'll extract this from your email
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-md bg-border px-2 py-1 text-xs text-foreground">
                Name
              </div>

              <div className="rounded-md bg-border px-2 py-1 text-xs text-foreground">
                Branch
              </div>

              <div className="rounded-md bg-border px-2 py-1 text-xs text-foreground">
                Year
              </div>

              <div className="rounded-md bg-border px-2 py-1 text-xs text-foreground">
                Registration Number
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              No... we won't be saving any data, so don't worry ;)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
