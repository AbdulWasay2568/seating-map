import { useState, useRef, useEffect } from 'react';
import type { Seat as SeatType } from '../interfaces';
import { getSeatFillColor, getSeatStrokeColor } from '../utils/colors';
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
  const seatRef = useRef<SVGGElement>(null);

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
    <g
      ref={seatRef}
      className="seat-element"
      transform={`translate(${seat.x - 11}, ${seat.y - 11}) scale(${isFocused ? 1.15 : 1})`}
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
      }}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
    >
      {/* Larger invisible hover area */}
      <rect
        x="-8"
        y="-8"
        width="38"
        height="38"
        fill="transparent"
        pointerEvents="all"
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <svg width="24" height="24" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
        {/* Backrest - top rounded rectangle */}
        <rect 
          x="18" 
          y="12" 
          width="64" 
          height="32" 
          rx="5" 
          ry="5"
          fill={isSelected ? '#16A34A' : fillColor} 
          stroke={strokeColor} 
          strokeWidth={isFocused ? 2.5 : 1.2}
          strokeLinejoin="round"
        />
        {/* Backrest shadow/depth */}
        <line 
          x1="18" 
          y1="44" 
          x2="82" 
          y2="44" 
          stroke={strokeColor}
          strokeWidth={0.8}
          opacity="0.3"
        />
        {/* Seat base - bottom rounded rectangle */}
        <rect 
          x="20" 
          y="48" 
          width="60" 
          height="28" 
          rx="5" 
          ry="5"
          fill={isSelected ? '#16A34A' : fillColor} 
          stroke={strokeColor} 
          strokeWidth={isFocused ? 2.5 : 1.2}
          strokeLinejoin="round"
        />
        {/* Left leg */}
        <line 
          x1="30" 
          y1="76" 
          x2="28" 
          y2="90" 
          stroke={strokeColor}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Right leg */}
        <line 
          x1="70" 
          y1="76" 
          x2="72" 
          y2="90" 
          stroke={strokeColor}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Front left foot */}
        <circle 
          cx="28" 
          cy="92" 
          r="2.5"
          fill={strokeColor}
        />
        {/* Front right foot */}
        <circle 
          cx="72" 
          cy="92" 
          r="2.5"
          fill={strokeColor}
        />
      </svg>
    </g>
  );
}
