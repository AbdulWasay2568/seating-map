# Interactive Event Seating Map

A modern React + TypeScript application for rendering an interactive seating map for events. Users can select up to 8 seats, view real-time pricing details, and persist their selections across page reloads using localStorage.

## Getting Started

### Prerequisites
- Node.js 16+ with pnpm

### Installation & Development
```bash
pnpm install
pnpm dev
```

The application will start at `http://localhost:5173`

### Build for Production
```bash
pnpm build
pnpm preview
```

## Features Implemented ✅

### Core Requirements
1. **Venue Data Loading** - Loads `public/venue.json` and renders all seats with correct positioning
2. **Seat Selection** - Users can select up to 8 seats via mouse click or keyboard (Enter/Space)
3. **Live Summary** - Real-time order summary showing:
   - Seat count progress (selected/8)
   - Individual seat prices
   - Subtotal + 5% service fee calculation
   - Total amount
4. **Seat Details Panel** - Shows section, row, seat number, price, and status on focus/click
5. **Persistent Selection** - Selected seats are saved to localStorage and restored on page reload
6. **Accessibility**
   - ARIA labels on all interactive elements
   - Keyboard navigation (Tab, Enter, Space)
   - Focus management and visual feedback
   - Responsive design (desktop & mobile)
7. **Performance** - SVG-based rendering optimized for smooth 60fps interactions
8. **Interactive Features**
   - Drag to pan the seating map
   - Ctrl+Scroll (Cmd+Scroll on Mac) to zoom in/out
   - Reset button to return to default zoom/pan state
   - Color-coded seat statuses (Available, Reserved, Sold, Held)

## Architecture & Design Decisions

### Component Structure
- **`Seating.tsx`** - Main page component handling state management, data loading, and localStorage persistence
- **`SeatingMap.tsx`** - SVG-based interactive map with zoom/pan controls
- **`Seat.tsx`** - Individual seat component with keyboard and mouse interactions
- **`SelectionSummary.tsx`** - Two-column layout displaying seat list and pricing breakdown
- **`SeatDetails.tsx`** - Right sidebar showing focused seat information
- **`VenueHeader.tsx`** - Header with venue info and legend showing seat counts

### Technology Choices

**React + TypeScript (strict mode)**
- Type-safe development with strict compiler options
- Component-based architecture for maintainability

**Vite**
- Fast development server and optimized production builds
- Native ES modules for quick HMR (Hot Module Replacement)

**Tailwind CSS**
- Utility-first styling for rapid UI development
- Built-in dark mode (using slate palette)
- Responsive design utilities

**SVG Rendering**
- Vector graphics for crisp rendering at any scale
- Direct coordinate-based positioning from JSON data
- Lower memory footprint compared to Canvas or DOM elements
- Optimized for 15,000+ seats without performance degradation

**localStorage**
- Client-side persistence without backend dependency
- Automatic save on every selection change
- Automatic restore on app initialization

### State Management
- **React Hooks** - useState for UI state, useEffect for side effects
- **localStorage Integration** - Persists seat selections with error handling
- **Component Props** - Data flows down, callbacks flow up (unidirectional)

### Performance Optimizations
1. **SVG-based rendering** - Efficient for large seat counts
2. **Transformed groups** - Sections are grouped and transformed together
3. **Smooth transitions** - CSS transforms instead of layout recalculations
4. **Conditional zoom** - Zoom only triggered with Ctrl/Cmd key to prevent accidental zoom

## Incomplete Features / TODOs

The following stretch goals were not implemented but could enhance the application:

- **WebSocket Integration** - Live seat-status updates and real-time availability changes
- **Adjacent Seats Finder** - Button to automatically find N available adjacent seats
- **Touch Gestures** - Pinch-zoom and pan support for mobile devices
- **Unit & E2E Tests** - Jest for unit tests, Playwright/Cypress for integration tests
- **Responsive Sidebar** - Collapsible details panel on mobile to maximize seating map area
- **Undo/Redo** - Users could undo recent selections
- **Seat Search Filter** - Filter by price tier or seat status

## Testing

Currently, no automated tests are included. To add tests:

```bash
# Would require installing testing dependencies
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# Then create tests in `src/__tests__/` directory
```

Example test structure:
- `Seat.test.tsx` - Keyboard/mouse interaction tests
- `SelectionSummary.test.tsx` - Calculation and limit validation tests
- `Seating.test.tsx` - localStorage persistence tests

## Code Quality

- **ESLint** - Configured with React and TypeScript rules
- **TypeScript Strict Mode** - Enabled for full type safety
- **Modular Components** - Each component has a single responsibility
- **Consistent Styling** - Tailwind CSS utility classes

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Key Files

```
src/
├── pages/
│   └── Seating.tsx          # Main seating page with state management
├── components/
│   ├── SeatingMap.tsx       # Interactive SVG map with pan/zoom
│   ├── Seat.tsx             # Individual seat component
│   ├── SelectionSummary.tsx # Order summary and pricing
│   ├── SeatDetails.tsx      # Focused seat details panel
│   ├── VenueHeader.tsx      # Header with legend
│   └── ui/
│       ├── Loader.tsx       # Loading state
│       ├── ErrorState.tsx   # Error handling
│       └── EmptyState.tsx   # Empty state components
├── interfaces/
│   ├── venue.interface.ts   # Venue data types
│   ├── selection.interface.ts # Selection types
│   └── enum.interface.ts    # Enums for seat status
├── utils/
│   ├── colors.ts            # Color palette and helpers
│   └── priceMap.ts          # Price tier mappings
└── App.tsx                  # Root component

public/
└── venue.json              # Venue data (seats, sections, positions)
```

## Known Limitations

1. **No Backend Sync** - Selections only persist locally; not synced across sessions/devices
2. **No Real-time Updates** - Seat availability doesn't update without page reload
3. **SVG Scaling** - Pan/zoom controlled via manual transform; no gesture support on mobile

## Future Enhancements

1. Integrate with a backend API to sync selections
2. Add WebSocket for live seat availability updates
3. Implement touch gestures for mobile pan/zoom
4. Add unit and E2E test coverage
5. Implement analytics/tracking for seat selections

---

**Built with React 19, TypeScript, and Tailwind CSS**
