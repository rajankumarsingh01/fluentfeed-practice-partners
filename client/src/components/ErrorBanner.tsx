const ErrorBanner = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
    <span>⚠️</span>
    <span>{message}</span>
  </div>
);

export default ErrorBanner;