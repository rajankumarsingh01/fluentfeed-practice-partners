interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
}

const EmptyState = ({ icon = "🔍", title, message }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="font-semibold text-slate-700">{title}</h3>
    {message && <p className="text-sm text-slate-500 max-w-sm">{message}</p>}
  </div>
);

export default EmptyState;