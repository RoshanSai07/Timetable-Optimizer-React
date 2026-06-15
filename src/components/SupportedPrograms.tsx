import { motion } from "framer-motion";
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

export default function SupportedPrograms() {
  return (
    <section className="border-t border-foreground/15 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center">
          <p className="text-[12px] md:text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Currently Available For
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-5">
          {availablePrograms.map((program) => (
            <div
              key={`${program.year}-${program.branch}`}
              className="rounded-md border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                  {program.branch}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">
                    {formatYear(program.year)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {program.branch}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5s text-center text-sm text-muted-foreground">
          More branches being added - check back each semester
        </p>
      </div>
    </section>
  );
}
