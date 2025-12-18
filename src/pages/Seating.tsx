import { useState, useEffect } from 'react';
import SeatingMap from '../components/SeatingMap';
import SeatDetails from '../components/SeatDetails';
import SelectionSummary from '../components/SelectionSummary';
import VenueHeader from '../components/VenueHeader';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import type { Venue, SelectedSeatInfo, Seat as SeatType } from '../interfaces';

export default function SeatingPage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatInfo[]>([]);
  const [focusedSeat, setFocusedSeat] = useState<SelectedSeatInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load venue data from JSON
  useEffect(() => {
    const loadVenue = async () => {
      try {
        const response = await fetch('/venue.json');
        if (!response.ok) throw new Error('Failed to load venue data');
        const data: Venue = await response.json();
        setVenue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, []);

  // Load selections from localStorage
  useEffect(() => {
    if (!venue) return;

    const stored = localStorage.getItem('seatSelections');
    if (stored) {
      try {
        const seatIds = JSON.parse(stored);
        const seats: SelectedSeatInfo[] = [];

        venue.sections.forEach((section) => {
          section.rows.forEach((row) => {
            row.seats.forEach((seat) => {
              if (seatIds.includes(seat.id)) {
                seats.push({
                  seat,
                  section: section.label,
                  row: row.index,
                });
              }
            });
          });
        });

        if (seats.length > 0) {
          setSelectedSeats(seats);
        }
      } catch (err) {
        console.error('Failed to load selections from localStorage', err);
        localStorage.removeItem('seatSelections');
      }
    }
  }, [venue]);

  // Save selections to localStorage whenever they change
  useEffect(() => {
    const seatIds = selectedSeats.map((s) => s.seat.id);
    try {
      localStorage.setItem('seatSelections', JSON.stringify(seatIds));
    } catch (err) {
      console.error('Failed to save selections to localStorage', err);
    }
  }, [selectedSeats]);

  const handleSeatClick = (seat: SeatType, sectionLabel: string, rowIndex: number) => {
    if (seat.status === 'available') {
      const isSelected = selectedSeats.some((s) => s.seat.id === seat.id);

      if (isSelected) {
        setSelectedSeats(selectedSeats.filter((s) => s.seat.id !== seat.id));
      } else if (selectedSeats.length < 8) {
        setSelectedSeats([
          ...selectedSeats,
          { seat, section: sectionLabel, row: rowIndex },
        ]);
      }

      setFocusedSeat({ seat, section: sectionLabel, row: rowIndex });
    }
  };

  const handleSeatFocus = (seat: SeatType, sectionLabel: string, rowIndex: number) => {
    setFocusedSeat({ seat, section: sectionLabel, row: rowIndex });
  };

  const handleSeatBlur = () => {
    setFocusedSeat(null);
  };

  const handleClearSelection = () => {
    setSelectedSeats([]);
    setFocusedSeat(null);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const loadVenue = async () => {
      try {
        const response = await fetch('/venue.json');
        if (!response.ok) throw new Error('Failed to load venue data');
        const data: Venue = await response.json();
        setVenue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    loadVenue();
  };

  if (loading) {
    return <Loader message="Loading venue data..." fullScreen={true} />;
  }

  if (error || !venue) {
    return (
      <ErrorState
        title="Failed to Load Venue"
        message={error || 'Venue data not found'}
        onRetry={handleRetry}
        fullScreen={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-6">
      <VenueHeader venue={venue} />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top section: Seating Map and Seat Details side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Main seating map */}
          <div className="bg-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl overflow-x-auto border border-slate-800">
            <SeatingMap
              venue={venue}
              selectedSeats={selectedSeats}
              focusedSeat={focusedSeat}
              onSeatClick={handleSeatClick}
              onSeatFocus={handleSeatFocus}
              onSeatBlur={handleSeatBlur}
            />
          </div>

          {/* Seat Details */}
          <div className="h-fit lg:sticky lg:top-8">
            <SeatDetails focusedSeat={focusedSeat} />
          </div>
        </div>

        {/* Selection Summary below */}
        <SelectionSummary
          selectedSeats={selectedSeats}
          onClearSelection={handleClearSelection}
        />
      </div>
    </div>
  );
}
