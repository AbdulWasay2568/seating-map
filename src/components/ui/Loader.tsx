import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({ message = 'Loading...', fullScreen = false }: LoaderProps) {
  const containerClass = fullScreen
    ? `flex items-center justify-center h-screen bg-slate-950`
    : 'flex flex-col items-center justify-center py-12';

  return (
    <div className={containerClass}>
      <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin" />

      <p className="text-center text-slate-400">
        {message}
      </p>
    </div>
  );
}
