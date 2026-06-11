import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  LifeBuoy,
  Search,
  Sparkles,
  X,
  Share2,
} from "lucide-react";

type HelpDialogProps = {
  open: boolean;
  onClose: () => void;
};

type HelpSection = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: typeof BookOpen;
  steps: string[];
};

type HelpAnswer = {
  id?: string;
  question: string;
  answer: string;
  keywords: string[];
};

const helpSections: HelpSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    eyebrow: "01 · Sign in",
    description:
      "Use your VIT-AP student email to personalize the app for your academic year and branch.",
    icon: Sparkles,
    steps: [
      "Enter your college email on the landing page.",
      "Press Tab to autocomplete the student email domain if needed.",
      "The app reads your year, branch, name, and registration number locally.",
      "Continue to the dashboard to start building your semester plan.",
    ],
  },
  {
    id: "courses",
    title: "Select courses",
    eyebrow: "02 · Course cart",
    description:
      "Pick the subjects you plan to register for before choosing faculty and slots.",
    icon: BookOpen,
    steps: [
      "Search by course name or course code.",
      "Click a course card to add it to your selected list.",
      "Use the selected course chips to remove anything you added by mistake.",
      "Review the credit total, then click Continue.",
    ],
  },
  {
    id: "faculty",
    title: "Choose faculty",
    eyebrow: "03 · Slot planning",
    description:
      "Select theory and lab faculty for every course while the app watches for clashes.",
    icon: CheckCircle2,
    steps: [
      "Open each course tab from the top of the faculty panel.",
      "Search or sort faculty by name and slot.",
      "Select one theory option and one lab option when both are available.",
      "Resolve red conflict warnings before moving to the timetable.",
    ],
  },
  {
    id: "timetable",
    title: "Review timetable",
    eyebrow: "04 · Final schedule",
    description:
      "Your weekly timetable is generated after every selected course is complete and clash-free.",
    icon: HelpCircle,
    steps: [
      "Use the timetable view to see day-wise classes and free slots.",
      "Theory classes use the primary color and labs use the secondary color.",
      "Each class block shows course code, faculty, and selected slot.",
      "Go back to Faculty if you want to change an instructor or slot.",
    ],
  },
  {
    id: "share-export",
    title: "Share & Export",
    eyebrow: "05 · Export center",
    description:
      "Export your optimized timetable as an image or PDF, or share configuration files directly with friends.",
    icon: Share2,
    steps: [
      "Open the Import & Export Center from the Weekly Timetable dashboard.",
      "Choose PNG or PDF to download high-fidelity, printable copies of your timetable.",
      "Use JSON Export to download your configuration file, and send it to your friends.",
      "Your friends can use JSON Import to load your exact course and faculty selections instantly.",
    ],
  },
];

const helpAnswers: HelpAnswer[] = [
  {
    id: "share-import-export",
    question: "How do I share my selections with friends?",
    answer:
      "Go to the JSON Export tab in the Import & Export Center. Copy the text or download the JSON file, then send it to a friend. They can use the JSON Import tab to load your selections instantly.",
    keywords: [
      "share",
      "friend",
      "classmate",
      "json",
      "send",
      "import",
      "export",
    ],
  },
  {
    id: "export-formats",
    question: "What formats can I export my timetable in?",
    answer:
      "The app supports high-resolution PNG images for screens, A3 Landscape PDFs for printing/storage, and JSON configuration files for sharing data.",
    keywords: ["format", "png", "pdf", "file", "download", "export"],
  },
  {
    id: "zoom-disclaimer",
    question: "Does the preview zoom affect download quality?",
    answer:
      "No. The zoom scale slider is only for fitting the timetable inside your screen preview. PNG and PDF downloads are always rendered at 100% full high-resolution.",
    keywords: ["zoom", "scale", "quality", "size", "cutoff", "print"],
  },
  {
    question: "How do I use the timetable optimizer?",
    answer:
      "Start with your VIT-AP email, select your courses, choose theory and lab faculty for each course, fix any slot conflicts, then review the generated weekly timetable.",
    keywords: ["use", "start", "guide", "workflow", "how"],
  },
  {
    question: "Why can’t I continue to the timetable?",
    answer:
      "The timetable unlocks only when every selected course has the required faculty selections and no clashes remain. Check the faculty page for incomplete courses or red conflict alerts.",
    keywords: ["continue", "timetable", "locked", "cannot", "can't", "next"],
  },
  {
    question: "How are clashes detected?",
    answer:
      "A clash appears when two selected faculty options share the same slot. The app highlights the affected courses and slots so you can swap one option before continuing.",
    keywords: ["clash", "conflict", "overlap", "slots", "detect"],
  },
  {
    question: "Can I change a selected course?",
    answer:
      "Yes. Return to Courses and click a selected course chip to remove it. Removing a course also clears its saved faculty selection so your plan stays consistent.",
    keywords: ["change", "remove", "course", "delete", "selected"],
  },
  {
    question: "What should I do if a faculty option is missing?",
    answer:
      "Try searching by a shorter name or slot first. If it still does not appear, the faculty dataset may not include that option yet and needs to be updated in the project data.",
    keywords: ["missing", "faculty", "teacher", "not found", "data"],
  },
  {
    question: "Is my data saved permanently?",
    answer:
      "No permanent account storage is used here. Your choices are kept in browser session storage, which is useful while planning but can reset when the session ends.",
    keywords: ["save", "storage", "privacy", "data", "permanent"],
  },
  {
    question: "How do I search faster?",
    answer:
      "Use course codes for courses, faculty names for instructors, and slot names when comparing schedules. Short queries usually work better than full sentences.",
    keywords: ["search", "filter", "find", "quick", "faster"],
  },
  {
    question: "What do the colors mean?",
    answer:
      "Green primary states usually mean selected, ready, or theory-related items. Cyan secondary states usually identify lab-related items. Red indicates conflicts or destructive actions.",
    keywords: ["color", "green", "red", "cyan", "meaning", "status"],
  },
];

function getAnswerScore(answer: HelpAnswer, query: string) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return 0;

  const terms = normalizedQuery.split(/\s+/);
  const searchableText = [answer.question, answer.answer, ...answer.keywords]
    .join(" ")
    .toLowerCase();

  return terms.reduce((score, term) => {
    if (answer.question.toLowerCase().includes(term)) return score + 4;
    if (answer.keywords.some((keyword) => keyword.includes(term))) {
      return score + 3;
    }
    if (searchableText.includes(term)) return score + 1;
    return score;
  }, 0);
}

export default function HelpDialog({ open, onClose }: HelpDialogProps) {
  const [activeSectionId, setActiveSectionId] = useState(helpSections[0].id);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const activeSection =
    helpSections.find((section) => section.id === activeSectionId) ||
    helpSections[0];

  const suggestedAnswers = useMemo(() => {
    const rankedAnswers = helpAnswers
      .map((answer) => ({
        ...answer,
        score: getAnswerScore(answer, question),
      }))
      .filter((answer) => answer.score > 0)
      .sort((first, second) => second.score - first.score);

    return question.trim()
      ? rankedAnswers.slice(0, 3)
      : helpAnswers.slice(0, 4);
  }, [question]);

  if (!open) return null;

  const ActiveIcon = activeSection.icon;

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 px-6 py-8 backdrop-blur-sm"
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-7xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/20"
      >
        <aside className="hidden w-[290px] flex-col border-r border-border bg-muted/40 p-5 lg:flex">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <LifeBuoy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Help Center
              </div>
              <div className="text-xs text-muted-foreground">
                Timetable Optimizer docs
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {helpSections.map((section) => {
              const SectionIcon = section.icon;
              const active = section.id === activeSectionId;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-card"
                  }`}
                >
                  <SectionIcon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{section.title}</div>
                    <div className="truncate text-xs opacity-80">
                      {section.eyebrow}
                    </div>
                  </div>
                  {active && <ChevronRight className="h-4 w-4" />}
                </button>
              );
            })}
          </div>

          <div className="mt-auto rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <AlertCircle className="h-4 w-4 text-secondary" />
              Smart tip
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Resolve clashes while choosing faculty. It is easier than fixing a
              packed timetable at the end.
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Product guide
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                How can we help?
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                Learn the full workflow, troubleshoot common blockers, or ask a
                question about courses, faculty, clashes, and timetable output.
                Click outside or press Esc to close.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              aria-label="Close help dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="overflow-y-auto px-6 py-6">
            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-5">
                <div className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <ActiveIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {activeSection.eyebrow}
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-foreground">
                        {activeSection.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {activeSection.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {activeSection.steps.map((step, index) => (
                      <div
                        key={step}
                        className="flex gap-3 rounded-xl border border-border bg-card p-4"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-6 text-foreground">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      App steps
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Sign in → courses → faculty → timetable → export.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-2xl font-bold text-secondary">
                      Live
                    </div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      Clash checks
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Conflicts show while faculty is selected.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-2xl font-bold text-primary">Local</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      Session only
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      No account needed. Data lives in this browser tab.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Ask a question
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Type naturally, like “why is timetable locked?” or “how do
                      clashes work?”
                    </p>
                  </div>

                  <div className="relative mt-4">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                      placeholder="Ask about courses, faculty, clashes..."
                      className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                    />
                  </div>

                  <div className="mt-4 space-y-3">
                    {suggestedAnswers.length > 0 ? (
                      suggestedAnswers.map((answer) => (
                        <div
                          key={answer.question}
                          className="rounded-xl border border-border bg-muted/30 p-4"
                        >
                          <div className="text-sm font-semibold text-foreground">
                            {answer.question}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {answer.answer}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                        <div className="text-sm font-semibold text-foreground">
                          I do not have an exact match yet.
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Try asking with keywords like course, faculty, clash,
                          slot, timetable, search, or save. If it is a data
                          issue, check the relevant file in the project data.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted/40 p-5">
                  <h3 className="text-lg font-bold text-foreground">
                    Common fixes
                  </h3>
                  <div className="mt-4 space-y-3">
                    {[
                      "If a course disappears, confirm it is not already selected.",
                      "If faculty looks empty, check the active course tab first.",
                      "If conflicts remain, swap one course’s theory or lab slot.",
                      "If data resets, start again in the same browser session.",
                    ].map((fix) => (
                      <div key={fix} className="flex gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="leading-6 text-muted-foreground">
                          {fix}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
