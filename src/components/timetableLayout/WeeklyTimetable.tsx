import type {
  Timetable,
  TimetableRow,
  TimetableCell,
} from "../../types/timetable";

type Props = {
  timetable: Timetable;
  rows: TimetableRow[];
  days: string[];
};

export default function WeeklyTimetable({ timetable, rows, days }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card p-5">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr>
            <th className="h-[50px] min-w-[100px] rounded-md border border-border bg-muted/20">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
                DAY
              </div>
            </th>

            {rows.map((row) => (
              <th
                key={row.time}
                className={`h-[50px] min-w-[160px] rounded-md border border-border text-center ${
                  row.time === "12.50 - 1.30"
                    ? "bg-secondary/[0.05]"
                    : "bg-muted/[0.15]"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-semibold tracking-tight text-foreground">
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
              <td className="h-[75px] rounded-md border border-border bg-muted/20 text-center">
                <div className="text-sm font-semibold tracking-wide text-foreground">
                  {day}
                </div>
              </td>

              {timetable[day].map((row) => (
                <td
                  key={`${day}-${row.time}`}
                  className="h-[75px] min-w-[160px]"
                >
                  {row.data ? (
                    <div
                      className={`
                            flex h-full w-full flex-col justify-between rounded-md border px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 ${
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
                                text-sm font-semibold tracking-tight
                                ${
                                  row.data.type === "theory"
                                    ? "text-primary"
                                    : "text-secondary"
                                }
                              `}
                          >
                            {row.data.courseCode}
                          </div>
                          <div className="rounded-md border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {row.data.currentSlot.join(" / ")}
                          </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {row.data.faculty}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-full w-full rounded-md border border-border/60 ">
                      <div className="absolute bottom-2 right-2 text-[9px] text-muted-foreground/50">
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
