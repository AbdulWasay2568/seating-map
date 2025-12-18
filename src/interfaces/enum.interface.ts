/**
 * Seat status enumeration
 */
export enum SeatStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold',
  HELD = 'held',
}

/**
 * Price tier enumeration
 */
export enum PriceTier {
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3,
  TIER_4 = 4,
}

/**
 * Selection state enumeration
 */
export enum SelectionAction {
  ADD = 'add',
  REMOVE = 'remove',
  CLEAR = 'clear',
}

/**
 * View mode enumeration
 */
export enum ViewMode {
  NORMAL = 'normal',
  HEATMAP = 'heatmap',
  AVAILABILITY = 'availability',
}

/**
 * Notification type enumeration
 */
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Payment status enumeration
 */
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}
