import { BarChart3, Search, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message: string;
  icon?: 'seats' | 'search' | 'inbox';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ICONS: Record<'seats' | 'search' | 'inbox', React.ReactNode> = {
  seats: <BarChart3 className="w-12 h-12 text-blue-500" />,
  search: <Search className="w-12 h-12 text-slate-500" />,
  inbox: <Inbox className="w-12 h-12 text-slate-500" />,
};

export default function EmptyState({
  title = 'No items',
  message,
  icon = 'inbox',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4">{ICONS[icon]}</div>

      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-400 text-center max-w-xs mb-6">
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
