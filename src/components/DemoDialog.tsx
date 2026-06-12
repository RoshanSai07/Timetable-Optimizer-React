import { useState } from "react";
import {
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Lightbulb,
  BarChart2,
  CalendarCheck,
} from "lucide-react";

interface DemoPanelProps {
  open: boolean;
  onClose: () => void;
}

const whyPoints = [
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    title: "Mock registration is your only trial run",
    desc: "VIT AP's course registration lasts just a few hours. Going in unprepared means wasted slots, clashes you only discover after confirming, and no time to recover.",
    tone: "warn",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Slot conflicts cost you credits",
    desc: "Two courses sharing a slot means you can only register one. Without pre-planning, you might lose a core subject because a lab ate its slot.",
    tone: "warn",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    title: "Plan here first, register with confidence",
    desc: "Build your full semester here, clash detection runs in real time. By the time you open VTOP, you already know exactly which courses and teachers to pick.",
    tone: "good",
  },
  {
    icon: <BarChart2 className="h-4 w-4" />,
    title: "Compare teachers before committing",
    desc: "The same course can have many instructors across different slots. Timetable Optimizer lets you see all options side-by-side so you can pick the best fit.",
    tone: "good",
  },
];

const steps = [
  {
    step: "01",
    title: "Open Timetable Optimizer",
    desc: "Sign in with your VIT AP email. Your branch, year, and courses are auto-filtered, no manual setup",
  },
  {
    step: "02",
    title: "Add all the courses you want",
    desc: "Search by name or code. Add theory and lab courses. Watch the clash indicator, red means conflict, fix it before moving on",
  },
  {
    step: "03",
    title: "Pick your teachers",
    desc: "Each course shows every instructor and the slot they teach. Compare and choose. The timetable updates live",
  },
  {
    step: "04",
    title: "Export your final list",
    desc: "Take your finalised course + teacher + slot combination into VTOP and register exactly what you planned. You can share it with your friends too",
  },
];

const VIDEO_URL = "/demo.mp4";
export default function DemoDialog({ open, onClose }: DemoPanelProps) {
  const [playing, setPlaying] = useState(false);
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Play className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none">
                How it works
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Watch · Read · Register smarter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer h-8 w-8 border border-border rounded-md flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-border">
            {VIDEO_URL ? (
              <div className="aspect-video w-full bg-black">
                <video controls preload="metadata" className="h-full w-full">
                  <source src={VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div
                className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-3 bg-muted/60"
                onClick={() => setPlaying(!playing)}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
                  <Play className="h-6 w-6 translate-x-0.5 text-white" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Mock registration walkthrough
                </p>
                <div className="absolute right-3 top-3 text-[10px]">
                  Coming soon
                </div>
              </div>
            )}
            <div className="px-6 py-3 bg-muted/30">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Watch how a real course registration session unfolds and know
                how having a pre-built plan makes it effortless
              </p>
            </div>
          </div>

          <div className="space-y-0 divide-y px-6">
            <div className="py-6 border-border">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="text-[15px] font-semibold">
                  Why plan here before VTOP?
                </h3>
              </div>
              <div className="space-y-3">
                {whyPoints.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-md border border-border p-3.5"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                        p.tone === "warn"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-[15px] font-medium">{p.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-6">
              <div className="mb-4 flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                <h3 className="text-[15px] font-semibold">
                  Your pre-registration workflow
                </h3>
              </div>
              <div className="space-y-1">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5">
                        <span className="text-[12px] font-bold text-primary">
                          {s.step}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-border min-h-[24px]" />
                      )}
                    </div>
                    <div className="pb-5">
                      <div className="text-[15px] font-semibold">{s.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 rounded-md border border-primary/20 bg-primary/5 p-4 px-2">
                <p className="text-xs text-primary leading-relaxed">
                  <span className="font-semibold">Pro tip: </span> Do try this
                  before course registration opens. It takes really few minutes
                  here rather than many stressful minutes during registration
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border px-6 py-4">
          <div className="flex items-center justify-center">
            <p className="text-xs text-muted-foreground">
              Built for VIT AP students
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
