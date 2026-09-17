import React, { useEffect } from "react";
import { CheckCircle2, RotateCcw, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning";
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300 print:hidden pointer-events-auto max-w-[85vw] sm:max-w-xs">
      <div className="flex items-center gap-2.5 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700/60 backdrop-blur-md text-xs font-semibold">
        {toast.type === "success" ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
        )}

        <span className="text-slate-100 flex-1 truncate">{toast.message}</span>

        <button
          onClick={onDismiss}
          className="ml-1.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
