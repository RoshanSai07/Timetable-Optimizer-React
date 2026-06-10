type CourseCardProps = {
  code: string;
  name: string;
  credits: number;

  selected: boolean;

  onSelect: () => void;
};

export default function CourseCard({
  code,
  name,
  credits,
  selected,
  onSelect,
}: CourseCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        rounded-xl border p-5 text-left
        transition-all duration-200

        ${
          selected
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{code}</div>

          <div className="mt-1 font-medium text-foreground">{name}</div>
        </div>

        <div className="text-sm font-medium text-primary">
          {credits} Credits
        </div>
      </div>

      {selected && (
        <div className="mt-4 text-xs font-medium text-primary">Selected</div>
      )}
    </button>
  );
}
