import { SeatStatus } from './enum.interface';

/**
 * Seat interface
 */
export interface Seat {
  id: string;
  col: number;
  x: number;
  y: number;
  priceTier: number;
  status: SeatStatus;
}

/**
 * Row interface containing multiple seats
 */
export interface Row {
  index: number;
  seats: Seat[];
}

/**
 * Section interface containing multiple rows
 */
export interface Section {
  id: string;
  label: string;
  transform: {
    x: number;
    y: number;
    scale: number;
  };
  rows: Row[];
}

/**
 * Map dimensions
 */
export interface MapDimensions {
  width: number;
  height: number;
}

/**
 * Venue interface containing all sections
 */
export interface Venue {
  id: string;
  name: string;
  map: MapDimensions;
  sections: Section[];
}
