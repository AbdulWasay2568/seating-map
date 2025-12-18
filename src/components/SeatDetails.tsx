import type { SelectedSeatInfo } from '../interfaces';
import { getPriceForTier } from '../utils/priceMap';
import { Hand } from 'lucide-react';

interface SeatDetailsProps {
  focusedSeat: SelectedSeatInfo | null;
}

export default function SeatDetails({ focusedSeat }: SeatDetailsProps) {
  if (!focusedSeat) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
        <div className="mb-4 flex justify-center">
          <div className="p-2 bg-slate-700 rounded">
            <Hand className="w-5 h-5 text-slate-400" />
          </div>
        </div>
        <p className="text-slate-400 font-normal text-sm">
          Select a seat to view details
        </p>
      </div>
    );
  }

  const { seat, section, row } = focusedSeat;
  const price = getPriceForTier(seat.priceTier);
  
  const statusColorMap: Record<string, { label: string; color: string }> = {
    available: {
      label: 'Available',
      color: '#10b981',
    },
    reserved: {
      label: 'Reserved',
      color: '#f59e0b',
    },
    sold: {
      label: 'Sold',
      color: '#6b7280',
    },
    held: {
      label: 'On Hold',
      color: '#3b82f6',
    },
  };

  const status = statusColorMap[seat.status] || statusColorMap.available;

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1 font-medium">Seat Location</p>
            <h3 className="text-xl font-semibold text-white">
              {section} • Row {row} • Seat {seat.col}
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-700">
            <div 
              style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: status.color }}
            />
            <span className="text-xs font-medium text-slate-300">{status.label}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Price</p>
          <p className="text-2xl font-semibold text-white">
            ${price}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Seat ID</p>
          <p className="text-xs font-mono text-slate-300 bg-slate-700 bg-opacity-40 p-2 rounded border border-slate-600">
            {seat.id}
          </p>
        </div>

        {seat.status === 'available' && (
          <div className="mt-2 p-3 rounded bg-emerald-900 bg-opacity-60 border border-emerald-700">
            <p className="text-xs text-emerald-300 font-normal">
              ✓ Available for selection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
