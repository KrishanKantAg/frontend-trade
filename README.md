## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI / shadcn/ui
- **Architecture**: Atomic Design Pattern

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── atoms/             # Basic building blocks
│   ├── molecules/         # Component combinations
│   ├── organisms/         # Complex components
│   └── ui/                # shadcn/ui components
├── store/                 # Redux store
│   ├── store.ts          # Store configuration
│   └── slices/           # Redux slices
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture

### Atomic Design

The project follows atomic design principles:

- **Atoms**: Basic components (Icon, Badge, PercentageIndicator)
- **Molecules**: Component combinations (TokenLogo, TokenInfo, FinancialData)
- **Organisms**: Complex components (TokenRow, TokenTable, TabNavigation)
- **Templates**: Page layouts

### State Management

- **Redux Toolkit**: Complex state (tokens, UI state, sorting, filtering)
- **React Query**: Server state and data fetching
- **Local State**: Component-specific state with useState

### Performance Optimizations

- **Memoization**: React.memo for expensive components
- **Code Splitting**: Dynamic imports for heavy components
- **Optimized Renders**: useMemo and useCallback where needed
- **WebSocket Mock**: Efficient real-time updates

## Features Breakdown

### Token Discovery Table

- Displays tokens in card-based layout (not traditional table)
- Shows Market Cap, Volume, Fees, Transactions
- Real-time price updates with color transitions
- Percentage indicators (1h, 6h, 1d, 1w, 1m)
- Token metrics (holders, pro traders, trophies, crown, views)

### Interactions

- **Sorting**: Click column headers to sort (ascending/descending)
- **Tabs**: Switch between New Pairs, Final Stretch, Migrated
- **Tooltips**: Hover over elements for additional info
- **Popovers**: Click for detailed information
- **Modals**: Full-screen dialogs for token details
- **Hover Effects**: Smooth transitions on interactive elements

### Loading States

- **Skeleton**: Placeholder while loading
- **Shimmer**: Animated loading effect
- **Progressive Loading**: Load data incrementally
- **Error Boundaries**: Graceful error handling

## Responsive Design

The layout is fully responsive and tested at:

- **Desktop**: 1920px, 1440px, 1280px
- **Tablet**: 768px, 1024px
- **Mobile**: 375px, 414px, 320px

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

