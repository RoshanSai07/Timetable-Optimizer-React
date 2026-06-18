import { availablePrograms } from "../data/courses";

const formatYear = (year: string) => {
  switch (year) {
    case "firstYear":
      return "1st Year";
    case "secondYear":
      return "2nd Year";
    case "thirdYear":
      return "3rd Year";
    case "fourthYear":
      return "4th Year";
    default:
      return year;
  }
};

const yearStyles = {
  firstYear: {
    card: "border-orange-200/70 bg-orange-500/5 dark:border-orange-800/40 dark:bg-orange-500/10 hover:border-orange-400/50",
    badge:
      "bg-orange-200/50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  },

  secondYear: {
    card: "border-indigo-200/70 bg-indigo-500/5 dark:border-indigo-800/40 dark:bg-indigo-500/10 hover:border-indigo-400/50",
    badge:
      "bg-indigo-200/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
  },

  thirdYear: {
    card: "border-fuchsia-200/70 bg-fuchsia-500/5 dark:border-fuchsia-800/40 dark:bg-fuchsia-500/10 hover:border-fuchsia-400/50",
    badge:
      "bg-fuchsia-200/50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300",
  },

  fourthYear: {
    card: "border-amber-200/70 bg-amber-500/5 dark:border-amber-800/40 dark:bg-amber-500/10 hover:border-amber-400/50",
    badge:
      "bg-amber-200/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  },
};

export default function SupportedPrograms() {
  return (
    <section className="border-t border-foreground/15 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 md:mb-5 text-center">
          <p className="text-[12px] md:text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Currently Available For
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {availablePrograms.map((program) => {
            const styles = yearStyles[program.year as keyof typeof yearStyles];

            return (
              <div
                key={`${program.year}-${program.branch}`}
                className={`rounded-md border p-4 transition-all hover:shadow-sm md:p-5 ${styles.card}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold md:text-xs ${styles.badge}`}
                  >
                    {program.branch}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-foreground md:text-sm">
                      {formatYear(program.year)}
                    </div>

                    <div className="text-[10px] text-muted-foreground md:text-xs">
                      {program.branch}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground md:text-sm">
          More branches being added - check back each semester
        </p>
      </div>
    </section>
  );
}
