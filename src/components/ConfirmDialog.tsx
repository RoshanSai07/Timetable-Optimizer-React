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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="flex items-start gap-3 border-b border-border">
          <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg mt-1 font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-sm border border-border px-6 py-2 text-sm hover:bg-muted transition-all cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-sm bg-destructive px-5 py-2 text-sm text-destructive-foreground hover:opacity-90 transition-all cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
