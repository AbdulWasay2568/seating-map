import type{ Venue, SelectedSeatInfo, Seat as SeatType } from '../interfaces';
import { COLORS } from '../utils/colors';
import Seat from './Seat';

interface SeatingMapProps {
  venue: Venue;
  selectedSeats: SelectedSeatInfo[];
  focusedSeat: SelectedSeatInfo | null;
  onSeatClick: (seat: SeatType, sectionLabel: string, rowIndex: number) => void;
  onSeatFocus: (seat: SeatType, sectionLabel: string, rowIndex: number) => void;
  onSeatBlur: () => void;
}

export default function SeatingMap({
  venue,
  selectedSeats,
  focusedSeat,
  onSeatClick,
  onSeatFocus,
  onSeatBlur,
}: SeatingMapProps) {
  const selectedSeatIds = new Set(selectedSeats.map((s) => s.seat.id));
  const focusedSeatId = focusedSeat?.seat.id;

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
      <svg
        width={venue.map.width}
        height={venue.map.height}
        viewBox={`0 0 ${venue.map.width} ${venue.map.height}`}
        style={{
          backgroundColor: COLORS.background.primary,
          border: `1px solid ${COLORS.border.default}`,
          borderRadius: '4px',
          minWidth: '100%',
          minHeight: '100%',
        }}
        role="application"
        aria-label={`${venue.name} seating map`}
      >
        {/* Render all sections */}
        {venue.sections.map((section) => (
          <g
            key={section.id}
            transform={`translate(${section.transform.x}, ${section.transform.y}) scale(${section.transform.scale})`}
          >
            {/* Section label background */}
            <rect
              x={10}
              y={10}
              width={150}
              height={30}
              fill={COLORS.background.secondary}
              opacity={0.7}
              rx={4}
            />
            <text
              x={20}
              y={32}
              fontSize="12"
              fontWeight="bold"
              fill={COLORS.text.primary}
              aria-label={`Section ${section.label}`}
            >
              {section.label}
            </text>

            {/* Render all rows and seats */}
            {section.rows.map((row) => (
              <g key={`row-${row.index}`}>
                {/* Row label */}
                <text
                  x={-30}
                  y={row.seats[0]?.y + COLORS.svg.seatRadius / 2 + 3}
                  fontSize="12"
                  fontWeight="bold"
                  fill={COLORS.text.secondary}
                  textAnchor="end"
                  aria-label={`Row ${row.index}`}
                >
                  {row.index}
                </text>

                {/* Render seats in row */}
                {row.seats.map((seat) => (
                  <Seat
                    key={seat.id}
                    seat={seat}
                    sectionLabel={section.label}
                    rowIndex={row.index}
                    isSelected={selectedSeatIds.has(seat.id)}
                    isFocused={focusedSeatId === seat.id}
                    onSeatClick={() => onSeatClick(seat, section.label, row.index)}
                    onSeatFocus={() => onSeatFocus(seat, section.label, row.index)}
                    onSeatBlur={onSeatBlur}
                  />
                ))}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
