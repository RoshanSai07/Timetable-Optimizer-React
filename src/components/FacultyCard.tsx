import { CheckCircle2, AlertCircle } from "lucide-react";

type FacultyMember = {
  name: string;
  slots: string[];
};

type FacultyCardProps = {
  faculty: FacultyMember;
  type: "theory" | "lab";
  selected: boolean;
  onSelect: () => void;
  conflict?: boolean;
  onClear?: () => void;
};

export default function FacultyCard({
  faculty,
  type,
  selected,
  onSelect,
  conflict,
  onClear,
}: FacultyCardProps) {
  const colors =
    type === "theory"
      ? {
          border: "border-primary/20",
          bg: "bg-primary/5",
          text: "text-primary",
          chip: "border-primary/20 bg-primary/10 text-primary",
        }
      : {
          border: "border-secondary/20",
          bg: "bg-secondary/5",
          text: "text-secondary",
          chip: "border-secondary/20 bg-secondary/10 text-secondary",
        };

  const conflictColors = {
    border: "border-destructive/40",
    bg: "bg-destructive/10",
    text: "text-destructive",
    chip: "border-destructive/30 bg-destructive/15 text-destructive",
  };
  return (
    <button
      onClick={onSelect}
      className={`cursor-pointer group relative rounded-lg border p-4 text-left transition-all duration-200 ${
        conflict
          ? `${conflictColors.border} ${conflictColors.bg} shadow-sm`
          : selected
            ? `${colors.border} ${colors.bg} shadow-sm`
            : "border-border hover:border-primary/20 hover:bg-muted/50"
      }`}
    >
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {conflict ? (
          <AlertCircle className="h-4 w-4 text-destructive" />
        ) : selected ? (
          <CheckCircle2 className={`h-4 w-4 ${colors.text}`} />
        ) : null}
      </div>
      <div
        className={`text-base font-semibold transition-colors${
          conflict
            ? conflictColors.text
            : selected
              ? colors.text
              : "text-foreground"
        }`}
      >
        {faculty.name}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {faculty.slots.map((slot) => (
          <div
            key={slot}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              conflict
                ? conflictColors.chip
                : selected
                  ? colors.chip
                  : "border-border bg-muted/30 text-muted-foreground"
            }`}
          >
            {slot}
          </div>
        ))}
      </div>
    </button>
  );
}
