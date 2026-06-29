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
    card: "border-[#DBCDF0]/60 bg-card hover:border-[#DBCDF0]/90 hover:bg-[#DBCDF0]/5 dark:border-[#9D8CC5]/30 dark:bg-[#9D8CC5]/5 dark:hover:border-[#9D8CC5]/50 dark:hover:bg-[#9D8CC5]/10",
    badge:
      "border border-[#DBCDF0]/60 bg-[#DBCDF0]/80 text-neutral-700 dark:border-[#9D8CC5]/30 dark:bg-[#9D8CC5]/20 dark:text-[#E7DFF7]",
  },

  fourthYear: {
    card: "border-[#F7D9C4]/60 bg-card hover:border-[#F7D9C4]/90 hover:bg-[#F7D9C4]/5 dark:border-[#C79A7C]/30 dark:bg-[#C79A7C]/5 dark:hover:border-[#C79A7C]/50 dark:hover:bg-[#C79A7C]/10",
    badge:
      "border border-[#F7D9C4]/60 bg-[#F7D9C4]/80 text-neutral-700 dark:border-[#C79A7C]/30 dark:bg-[#C79A7C]/20 dark:text-[#F8E0D1]",
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
