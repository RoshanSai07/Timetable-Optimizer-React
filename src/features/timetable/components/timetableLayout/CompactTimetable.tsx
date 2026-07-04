import type { Timetable, TimetableRow } from "@/types/timetable";

type Props = {
  timetable: Timetable;
  days: string[];
};

export default function CompactTimetable({ timetable, days }: Props) {
  return (
    <div className="space-y-4 md:space-y-6">
      {days.map((day) => {
        const classes = timetable[day].filter((row: TimetableRow) => row.data);

        if (classes.length === 0) return null;

        return (
          <div key={day}>
            {/* Day Header */}
            <div className="mb-3 md:mb-4 flex items-center gap-2 md:gap-4">
              <h2 className="text-sm md:text-lg font-bold uppercase tracking-wider text-foreground">
                {day}
              </h2>

              <div className="h-px flex-1 bg-border" />

              <div className="whitespace-nowrap text-[10px] md:text-sm text-muted-foreground">
                {classes.length} class
                {classes.length !== 1 ? "es" : ""}
              </div>
            </div>

            {/* Classes */}
            <div className="space-y-2 md:space-y-3">
              {classes.map((row: TimetableRow) => (
                <div
                  key={`${day}-${row.time}`}
                  className="rounded-md md:rounded-xl border border-border bg-card p-2.5 md:p-4"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    {/* Time */}
                    <div className="md:w-24 md:shrink-0">
                      <div className="text-[10px] md:text-sm font-medium text-foreground">
                        {row.time}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-2 md:gap-3 flex-1">
                      {/* Color Bar */}
                      <div
                        className={`mt-0.5 h-6 md:h-10 w-1 shrink-0 rounded-full ${
                          row.data?.type === "theory"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                          <h3
                            className={`text-sm md:text-lg font-semibold ${
                              row.data?.type === "theory"
                                ? "text-primary"
                                : "text-secondary"
                            }`}
                          >
                            {row.data?.courseCode}
                          </h3>

                          <span className="rounded-md border border-border px-1.5 py-0.5 md:px-2 md:py-0.5 text-[8px] md:text-[10px] font-medium">
                            {row.data?.currentSlot.join(" / ")}
                          </span>
                        </div>

                        <p className="mt-0.5 md:mt-1 text-[9px] md:text-sm text-muted-foreground break-words">
                          {row.data?.faculty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
