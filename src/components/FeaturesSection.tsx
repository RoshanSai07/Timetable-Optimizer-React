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
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>

          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-primary/5 p-3">
        <p className="text-sm font-medium text-primary">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="px-4 xl:hidden border-t border-foreground/15 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            Why Students Use Timetable Optimizer
          </h2>

          <p className="md:mt-1 text-sm leading-6 text-muted-foreground md:text-md">
            Build your semester with confidence using tools designed
            specifically for VIT-AP students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FeatureCard
            icon={
              <div className="rounded-sm bg-primary/10 p-2">
                <Check className="h-4 w-4 text-primary" />
              </div>
            }
            title="Automatic Clash Detection"
            subtitle="Real-time validation"
            description="See conflicts instantly as you build your timetable."
          />
          <FeatureCard
            icon={
              <div className="rounded-sm bg-primary/10 p-2">
                <Download className="h-4 w-4 text-primary" />
              </div>
            }
            title="Export Schedule"
            subtitle="PDF • Image • Share"
            description="Download or share your finalized timetable."
          />
        </div>
      </div>
    </section>
  );
}
