import type { Timetable, TimetableRow, TimetableCell } from "@/types/timetable";

type Props = {
  timetable: Timetable;
  rows: TimetableRow[];
  days: string[];
};

export default function WeeklyTimetable({ timetable, rows, days }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card p-2 md:p-5">
      <table className="w-full border-separate border-spacing-1 md:border-spacing-3">
        <thead>
          <tr>
            <th className="h-[40px] md:h-[50px] min-w-[70px] md:min-w-[100px] rounded-sm md:rounded-md border border-border bg-muted/20">
              <div className="text-[9px] md:text-[11px] font-semibold tracking-[0.12em] md:tracking-[0.18em] text-muted-foreground">
                DAY
              </div>
            </th>

            {rows.map((row) => (
              <th
                key={row.time}
                className={`h-[40px] md:h-[50px] min-w-[110px] md:min-w-[160px] rounded-sm md:rounded-md border border-border text-center ${
                  row.time === "12.50 - 1.30"
                    ? "bg-secondary/[0.05]"
                    : "bg-muted/[0.15]"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-[10px] md:text-xs font-semibold tracking-tight text-foreground">
                    {row.time}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="h-[60px] md:h-[75px] rounded-sm md:rounded-md border border-border bg-muted/20 text-center">
                <div className="text-[10px] md:text-sm font-semibold tracking-wide text-foreground">
                  {day}
                </div>
              </td>

              {timetable[day].map((row) => (
                <td
                  key={`${day}-${row.time}`}
                  className="h-[60px] md:h-[75px] min-w-[110px] md:min-w-[160px]"
                >
                  {row.data ? (
                    <div
                      className={`
                            flex h-full w-full flex-col justify-between rounded-sm md:rounded-md border px-2 py-1.5 md:px-3 md:py-2.5 transition-all duration-200 hover:-translate-y-0.5 ${
                              row.data.type === "theory"
                                ? `
                                  border-primary/15
                                  bg-primary/[0.07]
                                `
                                : `
                                  border-secondary/15
                                  bg-secondary/[0.07]
                                `
                            }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div
                            className={`
                                text-xs md:text-sm font-semibold tracking-tight
                                ${
                                  row.data.type === "theory"
                                    ? "text-primary"
                                    : "text-secondary"
                                }
                              `}
                          >
                            {row.data.courseCode}
                          </div>
                          <div className="rounded-sm md:rounded-md border border-border/60 bg-background/80 px-1.5 py-0.5 md:px-2 text-[8px] md:text-[10px] font-medium text-muted-foreground">
                            {row.data.currentSlot.join(" / ")}
                          </div>
                        </div>
                        <div className="text-[8px] md:text-[10px] text-muted-foreground">
                          {row.data.faculty}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-full w-full rounded-sm md:rounded-md border border-border/60 ">
                      <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 text-[7px] md:text-[9px] text-muted-foreground/50">
                        {[...row.theorySlots, ...row.labSlots].join(" / ")}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
