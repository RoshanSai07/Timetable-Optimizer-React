import { useState } from "react";
import {
  X,
  BookOpen,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Zap,
  Users,
  Calendar,
  Download,
  Mail,
  Shield,
} from "lucide-react";
import Logo from "../assets/logo.svg";

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}

type Tab = "navigate" | "faq" | "info";

const faqs = [
  {
    q: "What is a slot?",
    a: "VIT AP uses a slot-based system where each course is assigned one or more slots (e.g. A1, B2, L1). A slot maps to a fixed day and time — theory slots (A–G) in the top row, lab slots (L1–L60) in the bottom row.",
  },
  {
    q: "Why can't I proceed to Teachers?",
    a: "You need to select at least one course before moving to teacher selection. Once courses are chosen, the Teachers step unlocks automatically.",
  },
  {
    q: "What counts as a clash?",
    a: "Two courses clash if they share any slot. For example, if Course A occupies slot B1 and Course B also occupies slot B1, they conflict and can't both be registered.",
  },
  {
    q: "Can I change my teacher after selecting?",
    a: "Yes — go back to the Teachers step at any time. Each course tab shows all available instructors for that slot, and you can switch freely before finalising.",
  },
  {
    q: "What does the email auto-detection do?",
    a: "Your VIT AP email encodes your name, join year, and branch code. We parse it to pre-filter courses relevant to your branch and show your academic year — no manual entry needed.",
  },
  {
    q: "Can I export my timetable?",
    a: "Yes. On the Timetable view, use the Download button to get a PNG of your schedule, or Share to copy a link.",
  },
];

const steps = [
  {
    icon: <Mail className="h-4 w-4" />,
    title: "Sign in with your email",
    desc: "Enter your VIT AP email (e.g. roshan.24bce8403@vitapstudent.ac.in). We extract your name, branch, year, and reg. number automatically.",
  },
  {
    icon: <BookOpen className="h-4 w-4" />,
    title: "Select your courses",
    desc: "Browse courses filtered for your branch. Use the search bar or filter by type (theory / lab). Add as many as you need — clash indicators appear in real time.",
  },
  {
    icon: <Users className="h-4 w-4" />,
    title: "Choose your teachers",
    desc: "For each course, a tab shows all available instructors and their assigned slots. Pick the one that suits your schedule.",
  },
  {
    icon: <Calendar className="h-4 w-4" />,
    title: "Review your timetable",
    desc: "Your full week view is generated with theory and lab slots colour-coded. Conflicts are highlighted. When you're happy, export or share.",
  },
];

export default function HelpDialog({ open, onClose }: HelpPanelProps) {
  const [tab, setTab] = useState<Tab>("navigate");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none">
                Help Center
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Timetable Optimizer · VIT AP
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

        <div className="flex border-b border-border px-6">
          {(
            [
              {
                id: "navigate",
                icon: <ArrowRight className="h-4 w-4" />,
                label: "How to use",
              },
              {
                id: "faq",
                icon: <HelpCircle className="h-4 w-4" />,
                label: "FAQ",
              },
              {
                id: "info",
                icon: <Info className="h-4 w-4" />,
                label: "About",
              },
            ] as { id: Tab; icon: React.ReactNode; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1 border-b-2 px-2 py-3 mr-5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "cursor-pointer border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {tab === "navigate" && (
            <div className="space-y-2">
              <p className="mb-6 text-[15px] text-muted-foreground">
                Follow these four steps to build your conflict-free timetable
              </p>
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                        Step {i + 1}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[15px] font-semibold">
                      {s.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-5 rounded-md border border-border bg-muted/40 p-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Slot legend
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center bg-primary gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium text-white">
                    A1–G2 Theory
                  </span>
                  <span className="inline-flex items-center bg-secondary gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium text-white">
                    L1–L60 Lab
                  </span>
                  <span className="inline-flex items-center bg-destructive gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium text-white">
                    Clash
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "faq" && (
            <div className="space-y-2">
              <p className="mb-5 text-[15px] text-muted-foreground">
                Common questions about the app
              </p>
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="rounded-md border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="cursor-pointer flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-medium transition-colors hover:bg-muted"
                  >
                    {f.q}
                    {openFaq === i ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-border bg-muted/30 px-4 py-3.5 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {tab === "info" && (
            <div className="space-y-7">
              <div className="rounded-md border border-border bg-muted/40 p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-primary rounded-sm text-white">
                    <img src={Logo} alt="Logo" className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-md font-semibold">
                      Timetable Optimizer
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Based on VIT AP mock course registration data
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A student-built tool to simplify semester registration at VIT
                  AP. No accounts, no data stored, everything runs in your
                  browser.
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  What we detect from your email
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Name", example: "roshan → Roshan" },
                    { label: "Join year", example: "24 → 2nd Year (2026)" },
                    { label: "Branch", example: "bce → BCE" },
                    { label: "Reg. Number", example: "24bce8403" },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5"
                    >
                      <span className="text-md font-medium">{r.label}</span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {r.example}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Privacy
                </p>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                  <Shield className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your email is parsed locally in the browser and never sent
                    to any server. No cookies, no tracking, no accounts.
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tips
                </p>
                <div className="space-y-2">
                  {[
                    "Use the search bar to find courses by code or name quickly",
                    "Lab courses count as double slots, check both L-slot rows",
                    "Red highlights during faculty selection means slot conflict, go back and swap a course selection",
                    "You can revisit any step using the top navigation bar",
                  ].map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border px-6 py-4">
          <button
            className="cursor-pointer w-full gap-2 flex justify-center items-center bg-primary rounded-md py-2 text-card text-sm hover:bg-primary/90"
            onClick={onClose}
          >
            Start building my timetable
          </button>
          <p className="mt-2.5 text-center text-xs text-muted-foreground">
            No account needed · Works entirely in your browser
          </p>
        </div>
      </div>
    </>
  );
}
