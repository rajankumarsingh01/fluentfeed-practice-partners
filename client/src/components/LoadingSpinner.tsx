const LoadingSpinner = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
    <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
    <p className="text-sm">{label}</p>
  </div>
);

export default LoadingSpinner;