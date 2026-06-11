import { useEffect } from "react";
import {
  AlertCircle,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  Layers3,
  ListChecks,
  PlayCircle,
  ShieldCheck,
  X,
} from "lucide-react";

type RegistrationGuideDialogProps = {
  open: boolean;
  onClose: () => void;
};

const officialRegistrationVideoPath = "/demo.mp4";

const registrationSteps = [
  {
    title: "Prepare multiple plans",
    description:
      "Keep your ideal timetable ready, plus backup faculty-slot combinations in case seats fill up.",
    icon: Layers3,
  },
  {
    title: "Watch the official flow",
    description:
      "Use the video above to understand exactly where to click inside the real registration portal.",
    icon: PlayCircle,
  },
  {
    title: "Register by priority",
    description:
      "Submit high-demand courses and faculty first, because every faculty member has limited seats.",
    icon: CalendarCheck,
  },
  {
    title: "Verify before submitting",
    description:
      "Compare the portal selections with your optimized timetable, then save or submit only after checking every slot.",
    icon: FileCheck2,
  },
];

const checklist = [
  "Keep your registration number, password, and backup login credentials ready before the portal opens.",
  "Prepare Plan A, Plan B, and Plan C timetables to easily swap options if slots fill up.",
  "Use the Import & Export Center to coordinate selections and match timetables with friends.",
  "Take a screenshot or save confirmation after the official portal accepts your final choices.",
];

const platformAdvantages = [
  {
    title: "Clash-Free Selections",
    description:
      "Automatically checks course theory/lab slots and alerts you to clashes in real-time as you pick.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Setup Sharing",
    description:
      "Export your config to JSON and send it to friends. They can import it to match selections instantly.",
    icon: Layers3,
  },
  {
    title: "Backup Playbook Plans",
    description:
      "Define backup faculty combinations ahead of time so you can act fast if a popular seat fills up.",
    icon: Clock3,
  },
  {
    title: "High-Quality Exports",
    description:
      "Export your completed clash-free timetable layout to high-res PNG or A3 Landscape PDF formats.",
    icon: FileCheck2,
  },
];

export default function RegistrationGuideDialog({
  open,
  onClose,
}: RegistrationGuideDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 px-6 py-8 backdrop-blur-sm"
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/20"
      >
        <header className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <BookOpenCheck className="h-3.5 w-3.5" />
              Official registration walkthrough
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Optimize selections and plan a clash-free schedule
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
              Timetable Optimizer helps you select your courses, compare available faculty, check for real-time clashes, and generate/share your weekly schedule before performing actual registration on the portal. Click outside or press Esc to close.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            aria-label="Close registration guide"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-5 lg:grid-cols-[1.55fr_0.65fr]">
            <section className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                <div className="border-b border-border bg-gradient-to-r from-primary/10 via-muted/40 to-secondary/10 px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <PlayCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          Official video: course registration flow
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Keep this as the source of truth for the actual
                          website steps.
                        </p>
                      </div>
                    </div>

                    <a
                      href={officialRegistrationVideoPath}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted"
                    >
                      Open separately
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="bg-black p-2">
                  <video
                    className="aspect-video w-full rounded-xl bg-black"
                    src={officialRegistrationVideoPath}
                    controls
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="grid gap-3 border-t border-border bg-card p-4 md:grid-cols-3">
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      Before portal opens
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      Build your ideal timetable and backups here first.
                    </p>
                  </div>
                  <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                      During registration
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      Register high-demand faculty before safer options.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      If seats fill
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      Switch to a prepared backup instead of guessing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {platformAdvantages.map((advantage) => {
                  const AdvantageIcon = advantage.icon;

                  return (
                    <div
                      key={advantage.title}
                      className="rounded-2xl border border-border bg-background p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <AdvantageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground">
                            {advantage.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {advantage.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                    <AlertCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      What this app can and cannot control
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      This optimizer can help you prepare clash-free choices,
                      backups, and order of action. It cannot control the
                      official portal, seat availability, page lag, login
                      issues, or internet problems during registration.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card">
                    <ListChecks className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Your registration strategy
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Do not enter the portal with only one perfect plan. Enter
                      with Plan A, Plan B, and Plan C.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/40 p-5">
                <h3 className="text-lg font-bold text-foreground">
                  Before registration
                </h3>
                <div className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <div key={item} className="flex gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="leading-6 text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-lg font-bold text-foreground">
                  Recommended order
                </h3>
                <div className="mt-4 space-y-3">
                  {registrationSteps.map((step, index) => {
                    const StepIcon = step.icon;

                    return (
                      <div key={step.title} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <StepIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                            {index + 1}
                          </div>
                          <div className="text-sm font-bold text-foreground">
                            {step.title}
                          </div>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
                <h3 className="text-lg font-bold text-foreground">
                  Best workflow
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep this optimizer and the official portal open side by side.
                  If a seat disappears, move to your next prepared option
                  instead of building a new timetable under stress.
                </p>
              </div>

              <a
                href={officialRegistrationVideoPath}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                Open video in new tab
                <ExternalLink className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
