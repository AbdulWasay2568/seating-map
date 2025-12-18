import type { SelectedSeatInfo } from '../interfaces';
import { getPriceForTier } from '../utils/priceMap';
import { Hand, CheckCircle } from 'lucide-react';

interface SeatDetailsProps {
  focusedSeat: SelectedSeatInfo | null;
}

export default function SeatDetails({ focusedSeat }: SeatDetailsProps) {
  if (!focusedSeat) {
    return (
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl p-8 text-center border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-blue-900 rounded-full">
            <Hand className="w-6 h-6 text-blue-300" />
          </div>
        </div>
        <p className="text-slate-300 font-semibold text-sm uppercase tracking-wide">
          Click on a seat to view details
        </p>
      </div>
    );
  }

  const { seat, section, row } = focusedSeat;
  const price = getPriceForTier(seat.priceTier);
  
  const statusColorMap: Record<string, { bg: string; text: string; badge: string }> = {
    available: {
      bg: 'bg-blue-950',
      text: 'text-blue-300',
      badge: 'bg-blue-900 text-blue-200',
    },
    reserved: {
      bg: 'bg-amber-950',
      text: 'text-amber-300',
      badge: 'bg-amber-900 text-amber-200',
    },
    sold: {
      bg: 'bg-rose-950',
      text: 'text-rose-300',
      badge: 'bg-rose-900 text-rose-200',
    },
    held: {
      bg: 'bg-blue-950',
      text: 'text-blue-300',
      badge: 'bg-blue-900 text-blue-200',
    },
  };

  const colors = statusColorMap[seat.status] || statusColorMap.available;

  return (
    <div className={`${colors.bg} rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-lg`}>
      {/* Header with status badge */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Seat Location
            </h3>
            <p className={`text-2xl font-black ${colors.text}`}>
              {section} • Row {row} • Seat {seat.col}
            </p>
          </div>
          <span
            className={`${colors.badge} px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap`}
          >
            {seat.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
            Price
          </div>
          <p className={`text-3xl font-black ${colors.text}`}>
            ${price}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
            Seat ID
          </div>
          <p className="text-sm font-mono text-slate-300 bg-slate-800 bg-opacity-60 p-3 rounded-lg border border-slate-700">
            {seat.id}
          </p>
        </div>

        {seat.status === 'available' && (
          <div className="mt-6 p-4 rounded-lg bg-emerald-900 border border-emerald-700 hover:bg-emerald-800 transition-colors">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <p className="text-sm text-emerald-300 font-semibold">
                Available for selection
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
