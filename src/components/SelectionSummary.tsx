import type { SelectedSeatInfo } from '../interfaces';
import { TAILWIND_COLORS } from '../utils/colors';
import { getPriceForTier } from '../utils/priceMap';
import { Ticket, MapPin, Check } from 'lucide-react';

interface SelectionSummaryProps {
  selectedSeats: SelectedSeatInfo[];
  onClearSelection: () => void;
}

export default function SelectionSummary({
  selectedSeats,
  onClearSelection,
}: SelectionSummaryProps) {
  const seatCount = selectedSeats.length;
  const seatsRemaining = 8 - seatCount;
  const subtotal = selectedSeats.reduce((sum, s) => sum + getPriceForTier(s.seat.priceTier), 0);
  const fee = subtotal * 0.05; // 5% service fee
  const total = subtotal + fee;

  if (seatCount === 0) {
    return (
      <div className="bg-slate-900 rounded-xl p-8 shadow-lg text-center border-2 border-dashed border-slate-700">
        <div className="mb-4 flex justify-center">
          <Ticket className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          No Seats Selected
        </h3>
        <p className="text-slate-400 font-medium mb-4">
          Click on available seats to start building your order
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Header */}
      <div className={`${TAILWIND_COLORS.bgGradient} p-6 text-white`}>
        <h3 className="text-lg font-black mb-1">
          Order Summary
        </h3>
        <p className="text-blue-100 text-sm font-medium">
          {seatCount}/8 seats selected
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Seat Count Progress */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Seats Selected
            </span>
            <span className="text-2xl font-black text-blue-400">
              {seatCount}/8
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(seatCount / 8) * 100}%`,
                background: 'linear-gradient(to right, #2563eb, #0ea5e9)',
              }}
            />
          </div>
        </div>

        {/* Seats Remaining */}
        {seatsRemaining > 0 && (
          <div className="p-4 rounded-lg bg-blue-900 border border-blue-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <p className="text-sm font-medium text-blue-300">
                {seatsRemaining} seat{seatsRemaining === 1 ? '' : 's'} remaining
              </p>
            </div>
          </div>
        )}

        {seatsRemaining === 0 && (
          <div className="p-4 rounded-lg bg-emerald-900 border border-emerald-700">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <p className="text-sm font-medium text-emerald-300">
                Maximum seats selected
              </p>
            </div>
          </div>
        )}

        {/* Seat List */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Selected Seats
          </h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {selectedSeats.map((s) => (
              <div
                key={s.seat.id}
                className="flex justify-between items-center p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-600 transition-colors"
              >
                <span className="font-semibold text-white text-sm">
                  {s.section} • Row {s.row} • Seat {s.seat.col}
                </span>
                <span className="font-bold text-blue-400 text-sm">
                  ${getPriceForTier(s.seat.priceTier)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="pt-6 space-y-3 border-t border-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Subtotal:</span>
            <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Service Fee (5%):</span>
            <span className="font-semibold text-white">${fee.toFixed(2)}</span>
          </div>

          <div className={`${TAILWIND_COLORS.bgGradient} rounded-xl p-4 flex justify-between items-center mt-4`}>
            <span className="font-bold text-white">Total:</span>
            <span className="text-2xl font-black text-white">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            style={{
              background: 'linear-gradient(to right, #059669, #10b981)',
              boxShadow: '0 10px 25px rgba(5, 150, 105, 0.2)',
            }}
            className="w-full px-4 py-3 rounded-lg font-bold text-white text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg"
          >
            Proceed to Checkout ({seatCount} seat{seatCount === 1 ? '' : 's'})
          </button>

          <button
            onClick={onClearSelection}
            className="w-full px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-300 border-2 border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
}
