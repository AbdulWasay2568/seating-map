import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorState({
  title = 'Error',
  message,
  onRetry,
  fullScreen = false,
}: ErrorStateProps) {
  const containerClass = fullScreen
    ? `flex items-center justify-center h-screen bg-slate-950`
    : 'flex flex-col items-center justify-center py-12 px-4';

  return (
    <div className={containerClass}>
      <div className="bg-rose-950 rounded-lg p-6 max-w-md text-center border border-rose-800">
        {/* Error Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-rose-900 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-rose-400" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white mb-2">
          {title}
        </h2>

        <p className="text-sm text-rose-200 mb-4">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-rose-600 text-white rounded font-semibold text-sm hover:bg-rose-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
