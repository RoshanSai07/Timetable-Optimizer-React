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
        <div className="mb-2 md:mb-5 text-center">
          <p className="text-[11px] md:text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Currently Available For
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 md:p-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {availablePrograms.map((program) => {
            const styles = yearStyles[program.year as keyof typeof yearStyles];

            return (
              <div
                key={`${program.year}-${program.branch}`}
                className={`rounded-md border p-3 md:p-4 md:py-5 transition-all hover:shadow-sm ${styles.card}`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-md text-[9px] md:text-xs font-semibold ${styles.badge}`}
                  >
                    {program.branch}
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs md:text-sm font-semibold text-foreground">
                      {formatYear(program.year)}
                    </div>

                    <div className="text-[9px] md:text-xs text-muted-foreground">
                      {program.branch}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-2 md:mt-3 text-center text-[11px] md:text-sm text-muted-foreground">
          More branches being added - check back each semester
        </p>
      </div>
    </section>
  );
}
