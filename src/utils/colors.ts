/**
 * Color palette for the interactive seating map
 */

export const COLORS = {
  // Seat statuses
  seat: {
    available: '#10b981', // Green
    reserved: '#dc2626', // Red
    sold: '#6b7280', // Gray
    held: '#f59e0b', // Amber
  },

  // Seat interactive states
  seatStates: {
    hover: '#059669', // Darker green
    selected: '#0891b2', // Cyan
    selectedHover: '#0e7490', // Darker cyan
    focus: '#1f2937', // Dark gray (for outline)
  },

  // Borders and outlines
  border: {
    default: '#d1d5db', // Light gray
    focus: '#3b82f6', // Blue (accessibility)
    focusRing: '#60a5fa', // Light blue
  },

  // Background and text
  background: {
    primary: '#ffffff', // White
    secondary: '#f9fafb', // Off-white
    tertiary: '#f3f4f6', // Light gray
    dark: '#1f2937', // Dark gray
  },

  text: {
    primary: '#111827', // Very dark gray
    secondary: '#4b5563', // Medium gray
    light: '#ffffff', // White
    muted: '#6b7280', // Muted gray
  },

  // UI elements
  ui: {
    success: '#10b981', // Green
    error: '#ef4444', // Red
    warning: '#f59e0b', // Amber
    info: '#3b82f6', // Blue
  },

  // Accessibility
  accessibility: {
    focusOutline: '#3b82f6', // Blue
    focusOutlineWidth: 2,
    highContrast: '#000000', // Pure black
  },

  // Price tiers (heatmap)
  priceTier: {
    tier1: '#10b981', // Green (cheapest)
    tier2: '#3b82f6', // Blue
    tier3: '#f59e0b', // Amber
    tier4: '#ef4444', // Red (most expensive)
  },

  // SVG-specific
  svg: {
    seatRadius: 8,
    seatStrokeWidth: 1,
    seatStroke: '#d1d5db', // Light gray
  },
} as const;

/**
 * Tailwind color mappings for CSS classes (Dark Mode Theme)
 */
export const TAILWIND_COLORS = {
  // Backgrounds - Dark Theme
  bgWhite: 'bg-slate-900',
  bgGray50: 'bg-slate-950',
  bgGray100: 'bg-slate-900',
  bgGray200: 'bg-slate-800',
  bgGreen500: 'bg-emerald-500',
  bgRed500: 'bg-rose-500',
  bgAmber500: 'bg-amber-500',
  bgBlue500: 'bg-blue-500',
  bgGray400: 'bg-slate-600',
  bgGradient: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500',
  bgGradientDark: 'bg-gradient-to-br from-blue-700 to-cyan-600',

  // Additional background colors
  bgEmerald50: 'bg-emerald-900',
  bgEmerald100: 'bg-emerald-800',
  bgYellow50: 'bg-amber-900',
  bgAmber100: 'bg-amber-800',
  bgRose50: 'bg-rose-900',
  bgRose100: 'bg-rose-800',
  bgBlue50: 'bg-blue-900',
  bgBlue100: 'bg-blue-800',

  // Hover backgrounds
  hoverGreen600: 'hover:bg-emerald-600',
  hoverAmber600: 'hover:bg-amber-600',
  hoverBg: 'hover:bg-slate-800',

  // Text colors - Light text for dark backgrounds
  textGray900: 'text-white',
  textGray600: 'text-slate-300',
  textGray500: 'text-slate-400',
  textGray700: 'text-slate-200',
  textWhite: 'text-white',
  textRed500: 'text-rose-400',
  textAmber600: 'text-amber-400',
  textAmber700: 'text-amber-300',
  textAmber800: 'text-amber-200',
  textBlue500: 'text-blue-400',
  textBlue600: 'text-blue-400',
  textBlue700: 'text-blue-300',
  textBlue800: 'text-blue-200',
  textRose700: 'text-rose-400',
  textRose800: 'text-rose-300',
  textEmerald700: 'text-emerald-400',
  textEmerald800: 'text-emerald-300',

  // Borders
  borderGray200: 'border-slate-700',
  borderGray300: 'border-slate-600',

  // Opacity
  opacityMuted: 'opacity-60',
  opacityFull: 'opacity-100',

  // Shadows
  shadowSm: 'shadow-sm',
  shadowMd: 'shadow-md',
  shadowLg: 'shadow-lg',
} as const;

/**
 * Get seat color based on status
 */
export const getSeatColor = (status: 'available' | 'reserved' | 'sold' | 'held'): string => {
  return COLORS.seat[status];
};

/**
 * Get price tier color (for heatmap feature)
 */
export const getPriceTierColor = (tier: 1 | 2 | 3 | 4): string => {
  return COLORS.priceTier[`tier${tier}` as keyof typeof COLORS.priceTier];
};

/**
 * Get seat stroke color based on state
 */
export const getSeatStrokeColor = (
  isSelected: boolean,
  isHovered: boolean,
  isFocused: boolean
): string => {
  if (isFocused) return COLORS.accessibility.focusOutline;
  if (isSelected) return COLORS.seatStates.selected;
  if (isHovered) return COLORS.border.focus;
  return COLORS.svg.seatStroke;
};

/**
 * Get seat fill color based on state (overrides status if selected/hovered)
 */
export const getSeatFillColor = (
  status: 'available' | 'reserved' | 'sold' | 'held',
  isSelected: boolean,
  isHovered: boolean
): string => {
  if (isSelected) return COLORS.seatStates.selected;
  if (isHovered && status === 'available') return COLORS.seatStates.hover;
  return getSeatColor(status);
};

