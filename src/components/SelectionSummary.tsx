import type { SelectedSeatInfo } from '../interfaces';
import { getPriceForTier } from '../utils/priceMap';
import { Ticket, X } from 'lucide-react';

interface SelectionSummaryProps {
  selectedSeats: SelectedSeatInfo[];
  onClearSelection: () => void;
  onRemoveSeat?: (seatId: string) => void;
}

export default function SelectionSummary({
  selectedSeats,
  onClearSelection,
  onRemoveSeat,
}: SelectionSummaryProps) {
  const seatCount = selectedSeats.length;
  const seatsRemaining = 8 - seatCount;
  const subtotal = selectedSeats.reduce((sum, s) => sum + getPriceForTier(s.seat.priceTier), 0);
  const fee = subtotal * 0.05; // 5% service fee
  const total = subtotal + fee;

  if (seatCount === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
        <div className="mb-4 flex justify-center">
          <Ticket className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No Seats Selected
        </h3>
        <p className="text-slate-400 text-sm">
          Select available seats to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-1">
          Order Summary
        </h3>
        <p className="text-sm text-slate-400">
          {seatCount}/8 seats selected
        </p>
      </div>

      {/* Content - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Column - Seats List */}
        <div>
          <h4 className="text-xs font-medium text-slate-500 mb-3">Selected Seats</h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {selectedSeats.map((s) => (
              <div
                key={s.seat.id}
                className="flex justify-between items-center p-3 bg-slate-700 bg-opacity-40 rounded border border-slate-600 hover:border-slate-500 transition-colors"
              >
                <span className="font-normal text-white text-sm">
                  {s.section} • Row {s.row} • Seat {s.seat.col}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-300 text-sm">
                    ${getPriceForTier(s.seat.priceTier)}
                  </span>
                  {onRemoveSeat && (
                    <button
                      onClick={() => onRemoveSeat(s.seat.id)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors text-slate-500 hover:text-slate-300 cursor-pointer"
                      title="Remove seat"
                      aria-label={`Remove seat ${s.seat.col.toString()} from selection`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Pricing & Buttons */}
        <div className="flex flex-col justify-between">
          {/* Pricing */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Service Fee (5%)</span>
              <span className="text-white font-medium">${fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-slate-600">
              <span className="font-semibold text-white">Total</span>
              <span className="text-lg font-semibold text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 pt-6">
            <button
              className="w-full px-4 py-2.5 rounded-lg font-medium text-white text-sm bg-emerald-700 hover:bg-emerald-600 transition-colors cursor-pointer"
            >
              Checkout ({seatCount} {seatCount === 1 ? 'seat' : 'seats'})
            </button>
            <button
              onClick={onClearSelection}
              className="w-full px-4 py-2.5 rounded-lg font-medium text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
