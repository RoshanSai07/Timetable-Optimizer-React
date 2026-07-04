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
  Mail,
  Share2,
} from "lucide-react";
import Logo from "@/assets/logo.svg";
import {
  formatName,
  formatYearLabel,
  formatRegNo,
} from "@/utils/formatStudent";

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}
type Tab = "navigate" | "faq" | "info";

const faqs = [
  {
    q: "Why do I need to sign in with my VIT-AP email?",
    a: "Your VIT-AP email contains information such as your branch, academic year, and registration number. Timetable Optimizer uses this to automatically load relevant registration data.",
  },
  {
    q: "What information is extracted from my email?",
    a: "Your registration number, branch, and academic year are automatically identified to reduce manual setup and ensure accurate course filtering.",
  },
  {
    q: "Do I need to manually enter my branch and year?",
    a: "No. These details are automatically determined from your VIT-AP email.",
  },
  {
    q: "Why can't I continue to Faculty Selection?",
    a: "At least one course must be selected before faculty options become available.",
  },
  {
    q: "What is a slot?",
    a: "A slot represents a fixed class timing. Every faculty member is assigned one or more slots, and your timetable is built using those slot assignments.",
  },
  {
    q: "What counts as a clash?",
    a: "A clash occurs when two selected faculty combinations occupy the same slot and therefore cannot be attended together.",
  },
  {
    q: "How does clash detection work?",
    a: "Whenever a faculty selection is made, its assigned slots are checked against your existing timetable and potential conflicts are highlighted automatically.",
  },
  {
    q: "Can I change a faculty selection later?",
    a: "Yes. Faculty selections can be changed at any time before exporting or sharing your timetable.",
  },
  {
    q: "Why are some courses missing?",
    a: "Only courses available for your branch and academic year are displayed. Data availability also depends on the latest mock registration dataset.",
  },
  {
    q: "Can I remove all selected courses or faculty at once?",
    a: "Yes. Use the Clear All option available in the Courses and Faculty sections.",
  },
  {
    q: "Can I export my timetable?",
    a: "Yes. Timetables can be exported as PNG, PDF, or JSON files.",
  },
  {
    q: "What's the difference between PNG, PDF, and JSON?",
    a: "PNG and PDF are meant for viewing and sharing. JSON exports preserve your course and faculty selections and can be imported later.",
  },
  {
    q: "Can I import a timetable shared by a friend?",
    a: "Yes. JSON exports can be imported directly if they belong to the same branch and academic year.",
  },
  {
    q: "Why can't I import this JSON file?",
    a: "Imports are restricted to students from the same branch and academic year to prevent incompatible course and faculty configurations.",
  },
  {
    q: "Will my timetable be saved automatically?",
    a: "Your selections remain available during the current browser session. Export your timetable if you want to keep a permanent copy.",
  },
];
const steps = [
  {
    icon: <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    title: "Sign in with your VIT-AP email",
    desc: "Your email is used to identify your branch, academic year, and registration number so that only relevant courses are shown.",
  },
  {
    icon: <BookOpen className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    title: "Build your course basket",
    desc: "Add the theory and lab courses you plan to register for. Search by course name or code and review your total credits as you build.",
  },
  {
    icon: <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    title: "Select faculty and slots",
    desc: "Each faculty member teaches specific slots. Choose your preferred faculty and watch your timetable update instantly.",
  },
  {
    icon: <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    title: "Review clashes and alternatives",
    desc: "Timetable clashes are detected automatically. Try different faculty combinations until you find a schedule that works.",
  },
  {
    icon: <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    title: "Export or share your plan",
    desc: "Download your timetable as PNG, PDF, or JSON. Share configurations with friends or keep them ready for registration day.",
  },
];

export default function HelpDialog({ open, onClose }: HelpPanelProps) {
  const [tab, setTab] = useState<Tab>("navigate");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!open) return null;
  const rawStudent = sessionStorage.getItem("student");

  const isDemo = !rawStudent;

  const student = rawStudent
    ? JSON.parse(rawStudent)
    : {
        email: "name.24bce001@vitapstudent.ac.in",
        name: "name",
        regNo: "24BCE001",
        branch: "BCE",
        yearLabel: "secondYear",
        joinYear: 24,
      };

  const currentYear = new Date().getFullYear();

  const detectedFields = [
    {
      label: "Email",
      example: student.email,
    },
    {
      label: "Name",
      example: `${student.name} → ${formatName(student.name)}`,
    },
    {
      label: "Join Year",
      example: `${student.joinYear} → ${formatYearLabel(
        student.yearLabel,
      )} (${currentYear})`,
    },
    {
      label: "Branch",
      example: `${student.branch.toLowerCase()} → ${student.branch}`,
    },
    {
      label: "Reg. Number",
      example: formatRegNo(student.regNo),
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex p-2 md:p-3 items-center justify-center rounded-md bg-primary/20 text-primary">
              <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div>
              <h2 className="text-md md:text-lg font-semibold leading-none">
                Help Center
              </h2>
              <p className="mt-0.5 text-[10px] md:text-xs text-muted-foreground">
                For FFCS · VIT AP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 md:p-3 border border-border rounded-md flex items-center justify-center"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <div className="flex border-b border-border px-6">
          {(
            [
              {
                id: "navigate",
                icon: <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />,
                label: "How to use",
              },
              {
                id: "faq",
                icon: <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />,
                label: "FAQ",
              },
              {
                id: "info",
                icon: <Info className="h-3.5 w-3.5 md:h-4 md:w-4" />,
                label: "About",
              },
            ] as { id: Tab; icon: React.ReactNode; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center md:gap-1 gap-2 border-b-2 px-2 py-3 mr-5 text-xs md:text-sm font-medium transition-colors ${
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
              <p className="mb-6 text-xs md:text-[15px] text-muted-foreground">
                Follow these four steps to build your conflict-free timetable
              </p>
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex p-2 md:p-3 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] md:text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
                        Step {i + 1}
                      </span>
                    </div>
                    <div className="mt-0.5 text-sm md:text-[15px] font-semibold">
                      {s.title}
                    </div>
                    <div className="md:mt-1 text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-5 rounded-md border border-border bg-muted/40 p-3 lg:p-4">
                <p className="mb-3 text-xs lg:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Slot legend
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center bg-primary gap-1.5 rounded-sm px-2.5 py-1 text-[10px] lg:text-xs font-medium text-white">
                    A1–G2 Theory
                  </span>
                  <span className="inline-flex items-center bg-secondary gap-1.5 rounded-sm px-2.5 py-1 text-[10px] lg:text-xs font-medium text-white">
                    L1–L60 Lab
                  </span>
                  <span className="inline-flex items-center bg-destructive gap-1.5 rounded-sm px-2.5 py-1 text-[10px] lg:text-xs font-medium text-white">
                    Clash
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "faq" && (
            <div className="space-y-2">
              <p className="mb-5 text-xs md:text-[15px] text-muted-foreground">
                Common questions about the app
              </p>
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="rounded-md border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="cursor-pointer flex w-full items-center justify-between px-4 py-3.5 text-left text-xs md:text-[15px] font-medium transition-colors hover:bg-muted"
                  >
                    {f.q}
                    {openFaq === i ? (
                      <ChevronDown className="h-3 w-3 md:h-4 md:w-4 shrink-0 ml-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 shrink-0 ml-4 text-muted-foreground" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-border bg-muted/30 px-4 py-3.5 text-[10px] md:text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {tab === "info" && (
            <div className="space-y-5 md:space-y-7">
              <div className="rounded-md border border-border bg-muted/40 p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex p-2 md:p-3 items-center justify-center bg-primary rounded-sm text-white">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="h-6 w-6 md:h-7 md:w-7"
                    />
                  </div>
                  <div>
                    <div className="text-[15px] md:text-md font-semibold">
                      Timetable Optimizer
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground">
                      Based on VIT AP mock course registration data
                    </div>
                  </div>
                </div>
                <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed">
                  A student-built tool to simplify semester registration at VIT
                  AP. No accounts, no data stored, everything runs in your
                  browser
                </p>
              </div>

              <div>
                <p className="mb-3 text-[12px] md:text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  What we detect from your email
                </p>
                {isDemo && (
                  <div className="mb-4 rounded-md border border-primary/20 bg-primary/5 p-3">
                    <p className="text-xs text-muted-foreground">
                      Showing a demo example because you're viewing the help
                      center before signing in.
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  {detectedFields.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between rounded-md border border-border px-4 py-2.5"
                    >
                      <span className="text-sm md:text-md font-medium">
                        {r.label}
                      </span>
                      <span className="font-mono text-xs md:text-sm text-muted-foreground">
                        {r.example}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[12px] md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Privacy
                </p>
                <div className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-4">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    Your email is parsed locally in the browser and never sent
                    to any server. No cookies, no tracking, no accounts
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tips
                </p>
                <div className="space-y-2 md:space-y-3">
                  {[
                    "Use the search bar to find courses by code or name quickly",
                    "Lab courses count as double slots, check both L-slot rows",
                    "Red highlights during faculty selection means slot conflict, go back and swap a course selection",
                    "You can revisit any step using the top navigation bar",
                  ].map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-xs md:text-sm text-muted-foreground"
                    >
                      <Zap className="mt-1 h-3 w-3 shrink-0 text-primary" />
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
            className="cursor-pointer w-full gap-2 flex justify-center items-center bg-primary rounded-md py-2 text-white text-sm hover:bg-primary/90"
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
