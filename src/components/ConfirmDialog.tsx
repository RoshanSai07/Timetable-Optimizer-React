import { AlertTriangle } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-5 md:p-0"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-md xl:rounded-xl border border-border bg-card p-4 md:p-6 shadow-xl"
      >
        <div className="flex items-start gap-3 border-b border-border">
          <div className="rounded-md bg-destructive/10 p-2 text-destructive">
            <AlertTriangle className="h-3.5 w-3.5 md:h-5 md:w-5" />
          </div>
          <div>
            <h3 className="text-[16px] md:text-lg mt-1 font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-1 md:mt-2 mb-4 text-[11px] md:text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-2 md:mt-2 md:justify-end md:gap-3">
          <button
            onClick={onCancel}
            className="flex-1 md:flex-none rounded-sm border border-border px-4 py-2 text-xs md:text-sm hover:bg-muted transition-all cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 md:flex-none rounded-sm bg-destructive px-5 py-2 text-xs md:text-sm text-destructive-foreground hover:opacity-90 transition-all cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
