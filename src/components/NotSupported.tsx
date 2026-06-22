import { ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotSupported() {
  const navigate = useNavigate();

  const demoEmail = "demo.24bce1234@vitapstudent.ac.in";

  const copyDemoEmail = async () => {
    await navigator.clipboard.writeText(demoEmail);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          We couldn't find data for your branch yet
        </h1>
        <div className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
          <p>First of all, thanks for trying out Timetable Optimizer</p>

          <p>
            We use your VIT-AP email to automatically identify your branch and
            academic year, so you don't have to enter that information manually.
            Unfortunately, while your email was parsed successfully, we couldn't
            find course registration data for your branch and year combination
            yet. That's why you're seeing this page
          </p>
        </div>
        {/* Demo */}
        <div className="mt-10">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Want to explore the platform anyway?
          </p>

          <div className="rounded-md border border-border bg-card">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <code className="text-xs md:text-sm text-foreground break-all">
                {demoEmail}
              </code>

              <button
                onClick={copyDemoEmail}
                className="cursor-pointer flex shrink-0 items-center gap-1 text-xs text-primary hover:underline"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex cursor-pointer items-center gap-2 text-sm text-primary transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Try another email
        </button>
        {/* Footer */}
        <p className="mt-12 text-sm text-muted-foreground">
          Want your branch supported? I'd love your help. Reach out on{" "}
          <a
            href="https://www.linkedin.com/in/roshan-kandregula"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-secondary underline underline-offset-4 transition-transform duration-200 hover:-translate-y-0.5"
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a
            href="https://www.instagram.com/roshan_sai07/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-secondary underline underline-offset-4 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Instagram
          </a>{" "}
          if you can share registration resources.
        </p>{" "}
      </div>
    </div>
  );
}
