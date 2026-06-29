import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Timetable, TimetableRow } from "@/types/timetable";

type Props = {
  timetable: Timetable;
  days: string[];
};

export default function DailyTimetable({ timetable, days }: Props) {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = days[selectedDay];
  const rows = timetable[day] || [];
  const classes = rows.filter((row) => row.data);

  return (
    <div className="rounded-md border border-border bg-card">
      <div className="mb-5 md:mb-8 flex flex-col gap-3 md:gap-4 px-3 md:px-6 pt-4 md:pt-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between lg:min-w-[320px] lg:max-w-[380px] lg:flex-1">
          <button
            onClick={() => setSelectedDay((prev) => Math.max(prev - 1, 0))}
            disabled={selectedDay === 0}
            className="cursor-pointer flex p-1.5 md:p-3 items-center justify-center rounded-lg border border-border bg-card transition-all hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
          </button>

          <div className="text-center">
            <h2 className="text-sm md:text-lg lg:text-xl font-bold tracking-tight text-foreground">
              {day}
            </h2>

            <p className="text-[9px] md:text-sm text-muted-foreground">
              {classes.length} class{classes.length !== 1 ? "es" : ""}
            </p>
          </div>

          <button
            onClick={() =>
              setSelectedDay((prev) => Math.min(prev + 1, days.length - 1))
            }
            disabled={selectedDay === days.length - 1}
            className="cursor-pointer flex p-1.5 md:p-3 items-center justify-center rounded-lg border border-border bg-card transition-all hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="flex items-center gap-1 rounded-md border border-border bg-muted/30 p-1">
            {days.map((d, index) => {
              const hasClasses = timetable[d].some((row) => row.data);

              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(index)}
                  className={`cursor-pointer flex flex-col items-center rounded-sm px-2 py-1.5 md:px-3 md:py-2 text-[9px] md:text-xs font-medium transition-all ${
                    selectedDay === index
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span>{d}</span>

                  <span
                    className={`mt-1 h-1 w-1 rounded-full ${
                      hasClasses
                        ? selectedDay === index
                          ? "bg-primary"
                          : "bg-primary/70"
                        : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-2 md:space-y-0 px-2 md:px-4 pb-4 md:pb-6">
        {rows.map((row: TimetableRow, index) => (
          <div key={row.time} className="flex gap-2 md:gap-4">
            <div className="w-15 md:w-30 shrink-0 text-right">
              <div className="text-[8px] md:text-sm font-medium text-foreground">
                {row.time}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`mt-0.5 h-2 w-2 md:h-3 md:w-3 rounded-full border-2 ${
                  row.data
                    ? row.data.type === "theory"
                      ? "border-primary bg-primary"
                      : "border-secondary bg-secondary"
                    : "border-border bg-background"
                }`}
              />

              {index !== rows.length - 1 && (
                <div className="h-10 md:h-16 w-px bg-border/50" />
              )}
            </div>

            <div className="flex-1 pr-1 md:pr-2 pb-2 md:pb-4">
              {row.data ? (
                <div
                  className={`rounded-md md:rounded-lg border p-2.5 md:p-4 transition-all hover:-translate-y-0.5 ${
                    row.data.type === "theory"
                      ? "border-primary/20 bg-primary/[0.05]"
                      : "border-secondary/20 bg-secondary/[0.05]"
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3
                        className={`text-xs md:text-lg font-semibold truncate ${
                          row.data.type === "theory"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      >
                        {row.data.courseCode}
                      </h3>

                      <p className="mt-1 text-[9px] md:text-sm text-muted-foreground truncate">
                        {row.data.faculty}
                      </p>
                    </div>

                    <div className="self-start rounded-sm border border-border bg-background px-1.5 py-0.5 md:px-2 md:py-1 text-[7px] md:text-[8px] font-medium whitespace-nowrap">
                      {row.data.currentSlot.join(" / ")}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-1 text-[10px] md:text-sm text-muted-foreground/50">
                  Free
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
