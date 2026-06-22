import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { availablePrograms } from "../data/courses";

interface ParsedInfo {
  name: string;
  branch: string;
  year: string;
  regNum: string;
  academicYear: number;
}

interface EmailParseAnimationProps {
  email: string;
  parsed: ParsedInfo;
  onComplete: () => void;
  onSkip: () => void;
}

const T_EMAIL_IN = 200;
const T_STEP_GAP = 800;
const T_BRANCH_CHECK = 1200;
const T_DONE_PAUSE = 1500;

type Step =
  | "idle"
  | "email"
  | "name"
  | "year"
  | "branch"
  | "reg"
  | "check"
  | "done";

const STEP_ORDER: Step[] = [
  "email",
  "name",
  "year",
  "branch",
  "reg",
  "check",
  "done",
];

export function EmailParseAnimation({
  email,
  parsed,
  onComplete,
  onSkip,
}: EmailParseAnimationProps) {
  const [step, setStep] = useState<Step>("idle");
  const [visible, setVisible] = useState(false);
  const [datasetFound, setDatasetFound] = useState(false);
  useEffect(() => {
    if (step === "check") {
      setDatasetFound(false);

      const timer = setTimeout(() => {
        setDatasetFound(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [step]);
  const matchedProgram = availablePrograms.find(
    (program) =>
      program.year === parsed.year && program.branch === parsed.branch,
  );

  const isAvailable = !!matchedProgram;
  const regex =
    /^([a-z0-9_]+)\.(\d{2})([a-z]{3})(\d+)@(vitapstudent\.ac\.in)$/i;
  const match = email.match(regex);
  const seg = match
    ? {
        name: match[1],
        year: match[2],
        branch: match[3],
        reg: match[4],
        domain: match[5],
      }
    : null;
  useEffect(() => {
    const t0 = setTimeout(() => setVisible(true), 50);

    const schedule = (s: Step, delay: number) =>
      setTimeout(() => setStep(s), delay);

    let base = T_EMAIL_IN;

    const t1 = schedule("email", base);
    base += T_STEP_GAP;

    const t2 = schedule("name", base);
    base += T_STEP_GAP;

    const t3 = schedule("year", base);
    base += T_STEP_GAP;

    const t4 = schedule("branch", base);
    base += T_STEP_GAP;

    const t5 = schedule("reg", base);
    base += T_STEP_GAP;

    const t6 = schedule("check", base);
    base += T_BRANCH_CHECK;

    const t7 = schedule("done", base);
    base += T_DONE_PAUSE;

    const t8 = setTimeout(onComplete, base);

    return () => [t0, t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout);
  }, [onComplete]);

  const stepIdx = STEP_ORDER.indexOf(step);
  const after = (s: Step) => stepIdx >= STEP_ORDER.indexOf(s);
  const cards = [
    {
      id: "name",
      label: "Name",
      value: parsed.name,
      color: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25",
      dot: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
      segKey: "name",
      segColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    },
    {
      id: "year",
      label: "Academic Year",
      value: parsed.year,
      color: "from-sky-500/15 to-sky-500/5 border-sky-500/25",
      dot: "bg-sky-500",
      text: "text-sky-600 dark:text-sky-400",
      segKey: "year",
      segColor: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    },
    {
      id: "branch",
      label: "Branch",
      value: parsed.branch,
      color: "from-violet-500/15 to-violet-500/5 border-violet-500/25",
      dot: "bg-violet-500",
      text: "text-violet-600 dark:text-violet-400",
      segKey: "branch",
      segColor: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    },
    {
      id: "reg",
      label: "Reg. Number",
      value: parsed.regNum,
      color: "from-amber-500/15 to-amber-500/5 border-amber-500/25",
      dot: "bg-amber-500",
      text: "text-amber-600 dark:text-amber-400",
      segKey: "reg",
      segColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    },
  ];
  const activeSegMap: Record<Step, string | null> = {
    idle: null,
    email: null,
    name: "name",
    year: "year",
    branch: "branch",
    reg: "reg",
    check: null,
    done: null,
  };
  const activeSeg = activeSegMap[step];
  const currentAction = (() => {
    switch (step) {
      case "email":
        return "Reading email format...";
      case "name":
        return "Extracting student name...";
      case "year":
        return "Determining academic year...";
      case "branch":
        return "Identifying branch code...";
      case "reg":
        return "Constructing registration number...";
      case "check":
        return datasetFound
          ? isAvailable
            ? "Course dataset located successfully"
            : "No course dataset found"
          : "Searching course database...";
      case "done":
        return "Preparing timetable workspace...";
      default:
        return "Initializing...";
    }
  })();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md px-5"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div className="w-full max-w-md space-y-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Parsing VIT-AP Email
          </p>
        </div>

        <div className="rounded-md border border-border bg-card p-4 text-center font-mono shadow-sm">
          {seg ? (
            <span className="break-all text-sm leading-relaxed">
              {(["name", "year", "branch", "reg"] as const).map((key) => (
                <span
                  key={key}
                  className={`rounded-md px-1 transition-all duration-500 ${
                    activeSeg === key
                      ? cards.find((c) => c.segKey === key)?.segColor
                      : after(key as Step)
                        ? cards.find((c) => c.segKey === key)?.segColor
                        : ""
                  }`}
                >
                  {seg[key]}
                  {key === "name" && "."}
                </span>
              ))}
              <span className="text-muted-foreground">@{seg.domain}</span>
            </span>
          ) : (
            email
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {cards.map((card) => {
            const shown = after(card.id as Step);
            return (
              <div
                key={card.id}
                className={`rounded-md border bg-gradient-to-br p-3 ${card.color}`}
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(10px)",
                  transition: "all .4s ease",
                }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-md ${card.dot}`} />
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {card.label}
                  </span>
                </div>

                <div className={`text-sm font-semibold ${card.text}`}>
                  {card.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-md border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            {step !== "check" && step !== "done" ? (
              <div className="h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
            ) : !datasetFound ? (
              <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
            ) : isAvailable ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive" />
            )}

            <div>
              <p className="text-sm font-medium">Processing Student Profile</p>

              <p className="text-xs text-muted-foreground">{currentAction}</p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="h-0.5 w-full overflow-hidden rounded-md bg-border">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-md"
              style={{
                width: `${Math.min(
                  100,
                  (stepIdx / (STEP_ORDER.length - 1)) * 100,
                )}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onSkip}
              className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Skip Animation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
