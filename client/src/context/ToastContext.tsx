import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let idCounter = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-[calc(100%-2rem)] sm:w-80">
        {toasts.map((t) => (
          <ToastBanner key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const styles: Record<ToastType, { bg: string; icon: string }> = {
  success: { bg: "bg-emerald-600", icon: "✅" },
  error: { bg: "bg-red-600", icon: "⚠️" },
  info: { bg: "bg-slate-800", icon: "ℹ️" },
};

const ToastBanner = ({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) => {
  const s = styles[toast.type];
  return (
    <div
      onClick={onDismiss}
      className={`${s.bg} text-white text-sm rounded-xl px-4 py-3 shadow-lg flex items-start gap-2 cursor-pointer animate-slide-in-right`}
    >
      <span>{s.icon}</span>
      <span className="flex-1">{toast.message}</span>
    </div>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};