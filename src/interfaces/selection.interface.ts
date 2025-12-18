/**
 * Selection state interfaces
 */

import type{ Seat } from './venue.interface';

/**
 * Information about a selected seat
 */
export interface SelectedSeatInfo {
  seat: Seat;
  section: string;
  row: number;
}

/**
 * Selection state
 */
export interface SelectionState {
  selectedSeats: SelectedSeatInfo[];
  focusedSeat: SelectedSeatInfo | null;
}

/**
 * Selection summary with pricing
 */
export interface SelectionSummary {
  seatCount: number;
  seatsRemaining: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}
