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
    <div className="mb-12 max-w-7xl mx-auto">
      {/* Header Top - Branding */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-1">{venue.name}</h1>
          <p className="text-sm text-slate-500">Venue ID: <span className="font-mono text-slate-400">{venue.venueId}</span></p>
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          {[
            { label: 'Total Seats', value: totalSeats },
            { label: 'Sections', value: venue.sections.length },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xs text-slate-500 font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-3xl font-semibold text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Available', color: COLORS.seat.available, count: seatCounts.available },
          { label: 'Reserved', color: COLORS.seat.reserved, count: seatCounts.reserved },
          { label: 'Sold', color: COLORS.seat.sold, count: seatCounts.sold },
          { label: 'Held', color: COLORS.seat.held, count: seatCounts.held },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: item.color,
                opacity: 0.8,
              }}
            />
            <span className="text-xs text-slate-400">{item.label} <span className="text-slate-500">({item.count})</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
