import { availablePrograms } from "@/data/courses";

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
    card: "border-[#FAEDCB]/60 bg-card hover:border-[#FAEDCB]/90 hover:bg-[#FAEDCB]/5 dark:border-[#D6C07A]/30 dark:bg-[#D6C07A]/5 dark:hover:border-[#D6C07A]/50 dark:hover:bg-[#D6C07A]/10",
    badge:
      "border border-[#FAEDCB]/60 bg-[#FAEDCB]/80 text-neutral-700 dark:border-[#D6C07A]/30 dark:bg-[#D6C07A]/20 dark:text-[#F6E7B3]",
  },

  secondYear: {
    card: "border-[#C6DEF1]/60 bg-card hover:border-[#C6DEF1]/90 hover:bg-[#C6DEF1]/5 dark:border-[#7DA9C8]/30 dark:bg-[#7DA9C8]/5 dark:hover:border-[#7DA9C8]/50 dark:hover:bg-[#7DA9C8]/10",
    badge:
      "border border-[#C6DEF1]/60 bg-[#C6DEF1]/80 text-neutral-700 dark:border-[#7DA9C8]/30 dark:bg-[#7DA9C8]/20 dark:text-[#D7E8F6]",
  },

  thirdYear: {
    card: "border-[#F7D9C4]/60 bg-card hover:border-[#F7D9C4]/90 hover:bg-[#F7D9C4]/5 dark:border-[#C79A7C]/30 dark:bg-[#C79A7C]/5 dark:hover:border-[#C79A7C]/50 dark:hover:bg-[#C79A7C]/10",
    badge:
      "border border-[#F7D9C4]/60 bg-[#F7D9C4]/80 text-neutral-700 dark:border-[#C79A7C]/30 dark:bg-[#C79A7C]/20 dark:text-[#F8E0D1]",
  },

  fourthYear: {
    card: "border-[#DBCDF0]/60 bg-card hover:border-[#DBCDF0]/90 hover:bg-[#DBCDF0]/5 dark:border-[#9D8CC5]/30 dark:bg-[#9D8CC5]/5 dark:hover:border-[#9D8CC5]/50 dark:hover:bg-[#9D8CC5]/10",
    badge:
      "border border-[#DBCDF0]/60 bg-[#DBCDF0]/80 text-neutral-700 dark:border-[#9D8CC5]/30 dark:bg-[#9D8CC5]/20 dark:text-[#E7DFF7]",
  },
};
export default function SupportedPrograms() {
  return (
    <section className="border-t border-foreground/15 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 text-center md:mb-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground md:text-sm">
            Currently Available For
          </p>
        </div>

        {/* Data Update Notice */}
        <div className="mx-3 mb-3 rounded-md border border-foreground/10 bg-muted/30 px-4 py-3 md:mx-auto md:mb-4 md:max-w-2xl">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </span>

            <div>
              <p className="text-xs font-medium text-foreground md:text-sm">
                A note on data and maintenance
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                Course and slot data for{" "}
                <span className="font-medium text-foreground">
                  BCE, BCA and BCD
                </span>{" "}
                has been updated for the current semester. Timetable Optimizer
                is currently receiving limited maintenance, so future updates
                and other branch information may not always be up to date.
              </p>
            </div>
          </div>
        </div>

        {/* Available Programs */}
        <div className="mx-auto grid max-w-3xl grid-cols-2 justify-items-center gap-2 p-3 md:grid-cols-3 md:gap-4 md:p-5 lg:grid-cols-3">
          {availablePrograms.map((program) => {
            const styles = yearStyles[program.year as keyof typeof yearStyles];

            return (
              <div
                key={`${program.year}-${program.branch}`}
                className={`w-full max-w-[240px] rounded-md border p-3 transition-all hover:shadow-sm md:p-4 md:py-5 ${styles.card}`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[9px] font-semibold md:h-10 md:w-10 md:text-xs ${styles.badge}`}
                  >
                    {program.branch}
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground md:text-sm">
                      {formatYear(program.year)}
                    </div>

                    <div className="text-[9px] text-muted-foreground md:text-xs">
                      {program.branch}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="mt-2 px-4 text-center text-[11px] leading-relaxed text-muted-foreground md:mt-3 md:text-sm">
          Please verify course availability and slot details on official
          channels before making your registration decisions
        </p>
      </div>
    </section>
  );
}
