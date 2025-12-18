import { useState, useRef, useEffect } from 'react';
import type { Seat as SeatType } from '../interfaces';
import { COLORS, getSeatFillColor, getSeatStrokeColor } from '../utils/colors';
import { getPriceForTier } from '../utils/priceMap';

interface SeatProps {
  seat: SeatType;
  sectionLabel: string;
  rowIndex: number;
  isSelected: boolean;
  isFocused: boolean;
  onSeatClick: () => void;
  onSeatFocus: () => void;
  onSeatBlur: () => void;
}

export default function Seat({
  seat,
  sectionLabel,
  rowIndex,
  isSelected,
  isFocused,
  onSeatClick,
  onSeatFocus,
  onSeatBlur,
}: SeatProps) {
  const [isHovered, setIsHovered] = useState(false);
  const seatRef = useRef<SVGCircleElement>(null);

  const isDisabled = seat.status !== 'available';
  const fillColor = getSeatFillColor(seat.status, isSelected, isHovered && !isDisabled);
  const strokeColor = getSeatStrokeColor(isSelected, isHovered && !isDisabled, isFocused);
  const price = getPriceForTier(seat.priceTier);

  const ariaLabel = `${sectionLabel} Row ${rowIndex} Seat ${seat.col}, $${price}, ${seat.status}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isDisabled) {
        onSeatClick();
      }
    }
  };

  useEffect(() => {
    if (isFocused && seatRef.current) {
      seatRef.current.focus();
    }
  }, [isFocused]);

  return (
    <circle
      ref={seatRef}
      cx={seat.x}
      cy={seat.y}
      r={COLORS.svg.seatRadius}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={isFocused ? 3 : COLORS.svg.seatStrokeWidth}
      onClick={() => !isDisabled && onSeatClick()}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={onSeatFocus}
      onBlur={onSeatBlur}
      onKeyDown={handleKeyDown}
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        opacity: isDisabled ? 0.6 : 1,
        filter: isHovered && !isDisabled ? 'brightness(1.1)' : 'brightness(1)',
      }}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
    />
  );
}
