import { useState, useRef, useEffect } from 'react';
import type{ Venue, SelectedSeatInfo, Seat as SeatType } from '../interfaces';
import { COLORS } from '../utils/colors';
import Seat from './Seat';
import { ZoomIn, ZoomOut } from 'lucide-react';

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
  const [zoom, setZoom] = useState(0.8);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const selectedSeatIds = new Set(selectedSeats.map((s) => s.seat.id));
  const focusedSeatId = focusedSeat?.seat.id;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.5));
  const handleReset = () => {
    setZoom(0.8);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    // Only allow dragging on empty space, not on interactive elements
    if (target.tagName === 'circle' || target.classList.contains('seat-element')) {
      return;
    }
    isDraggingRef.current = true;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  // Global mouse move and mouse up for drag outside SVG bounds
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragStart]);

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    // Only zoom if Ctrl (or Cmd on Mac) is held
    if (!e.ctrlKey && !e.metaKey) {
      return;
    }
    e.preventDefault();
    const zoomAmount = e.deltaY < 0 ? 1.2 : 1 / 1.2;
    setZoom((prev) => {
      const newZoom = Math.max(0.5, Math.min(prev * zoomAmount, 4));
      return newZoom;
    });
  };

  return (
    <div className="relative">
      {/* Control Panel */}
      <div className="absolute bottom-4 right-4 z-10 bg-slate-800 rounded-lg p-2 flex gap-2 border border-slate-700 shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-700 rounded transition-colors cursor-pointer"
          title="Zoom in (scroll up)"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-emerald-500" />
        </button>
        
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-700 rounded transition-colors cursor-pointer"
          title="Zoom out (scroll down)"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-emerald-500" />
        </button>

        <div className="border-l border-slate-600"></div>

        <button
          onClick={handleReset}
          className="p-2 hover:bg-slate-700 rounded transition-colors cursor-pointer px-3"
          title="Reset zoom and position"
          aria-label="Reset"
        >
          <span className="text-sm font-semibold text-emerald-500">Reset</span>
        </button>

        <div className="border-l border-slate-600"></div>

      </div>

      {/* Seating Map Container */}
      <div
        ref={containerRef}
        style={{ 
          overflowX: 'auto', 
          overflowY: 'auto', 
          maxHeight: 'calc(100vh - 200px)',
          backgroundColor: '#ffffff',
        }}
        className="cursor-grab active:cursor-grabbing"
      >
        <svg
          ref={svgRef}
          width={venue.map.width}
          height={venue.map.height}
          viewBox={`0 0 ${venue.map.width} ${venue.map.height}`}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            minWidth: '100%',
            minHeight: '100%',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            willChange: 'transform',
            shapeRendering: 'crispEdges',
            imageRendering: 'crisp-edges',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            WebkitBackfaceVisibility: 'hidden',
          }}
          role="application"
          aria-label={`${venue.name} seating map`}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
        {/* Render all sections */}
        {venue.sections.map((section) => {
          // Calculate the center x position of the section based on seats
          const allSeatsX = section.rows.flatMap(row => row.seats.map(seat => seat.x));
          const minX = Math.min(...allSeatsX);
          const maxX = Math.max(...allSeatsX);
          const centerX = (minX + maxX) / 2;

          return (
          <g
            key={section.id}
            transform={`translate(${section.transform.x}, ${section.transform.y}) scale(${section.transform.scale})`}
          >
            {/* Section label background */}
            <rect
              x={centerX - 75}
              y={10}
              width={150}
              height={30}
              fill={COLORS.background.secondary}
              opacity={0.7}
              rx={4}
            />
            <text
              x={centerX}
              y={32}
              fontSize="12"
              fontWeight="bold"
              fill={COLORS.text.primary}
              textAnchor="middle"
              aria-label={`Section ${section.label}`}
            >
              {section.label}
            </text>

            {/* Render all rows and seats */}
            <g transform="translate(0, 50)">
              {section.rows.map((row) => (
                <g key={`row-${row.index}`}>
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
          </g>
          );
        })}
        </svg>
      </div>
    </div>
  );
}
