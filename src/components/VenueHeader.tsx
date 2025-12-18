import type { Venue } from '../interfaces';
import { COLORS } from '../utils/colors';

interface VenueHeaderProps {
  venue: Venue;
}

export default function VenueHeader({ venue }: VenueHeaderProps) {
  const totalSeats = venue.sections.reduce((sum, section) => {
    return (
      sum +
      section.rows.reduce((rowSum, row) => {
        return rowSum + row.seats.length;
      }, 0)
    );
  }, 0);

  const seatCounts = {
    available: venue.sections.reduce((sum, section) => {
      return sum + section.rows.reduce((rowSum, row) => {
        return rowSum + row.seats.filter(s => s.status === 'available').length;
      }, 0);
    }, 0),
    reserved: venue.sections.reduce((sum, section) => {
      return sum + section.rows.reduce((rowSum, row) => {
        return rowSum + row.seats.filter(s => s.status === 'reserved').length;
      }, 0);
    }, 0),
    sold: venue.sections.reduce((sum, section) => {
      return sum + section.rows.reduce((rowSum, row) => {
        return rowSum + row.seats.filter(s => s.status === 'sold').length;
      }, 0);
    }, 0),
    held: venue.sections.reduce((sum, section) => {
      return sum + section.rows.reduce((rowSum, row) => {
        return rowSum + row.seats.filter(s => s.status === 'held').length;
      }, 0);
    }, 0),
  };

  return (
    <div className="mb-8 max-w-7xl mx-auto">
      {/* Header Top - Branding */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-lg">M</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{venue.name}</h1>
            <p className="text-xs text-slate-400">Venue ID: {venue.id}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Total Seats
            </div>
            <div className="text-2xl font-black text-white">
              {totalSeats}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Sections
            </div>
            <div className="text-2xl font-black text-white">
              {venue.sections.length}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6">
        {[
          { label: 'Available', color: COLORS.seat.available, count: seatCounts.available },
          { label: 'Reserved', color: COLORS.seat.reserved, count: seatCounts.reserved },
          { label: 'Sold', color: COLORS.seat.sold, count: seatCounts.sold },
          { label: 'Held', color: COLORS.seat.held, count: seatCounts.held },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: item.color,
              }}
            />
            <span className="text-sm font-medium text-slate-300">{item.label} ({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
