import { LayoutGrid, CalendarDays, List } from "lucide-react";

export type TimetableView = "weekly" | "daily" | "compact";

type Props = {
  view: TimetableView;
  setView: React.Dispatch<React.SetStateAction<TimetableView>>;
};

export default function TimetableViewSwitcher({ view, setView }: Props) {
  const tabs = [
    {
      id: "weekly",
      label: "Weekly",
      icon: LayoutGrid,
    },
    {
      id: "daily",
      label: "Day",
      icon: CalendarDays,
    },
    {
      id: "compact",
      label: "List",
      icon: List,
    },
  ] as const;

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-all ${
              view === tab.id
                ? "bg-card shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:block">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
