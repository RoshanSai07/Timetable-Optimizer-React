import { Check, Download } from "lucide-react";

function FeatureCard({
  icon,
  title,
  subtitle,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-foreground">
            {title}
          </h3>

          <p className="text-[11px] md:text-xs text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-primary/5 p-3">
        <p className="text-xs md:text-sm font-medium text-primary">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="px-5 xl:hidden border-t border-foreground/15 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-">
          <FeatureCard
            icon={
              <div className="rounded-sm bg-primary/10 p-2">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </div>
            }
            title="Automatic Clash Detection"
            subtitle="Real-time validation"
            description="See conflicts instantly as you build your timetable"
          />
          <FeatureCard
            icon={
              <div className="rounded-sm bg-primary/10 p-2">
                <Download className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </div>
            }
            title="Export Schedule"
            subtitle="PDF • Image • Share"
            description="Download or share your finalized timetable"
          />
        </div>
      </div>
    </section>
  );
}
