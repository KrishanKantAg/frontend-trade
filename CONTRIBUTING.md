# Contributing Guide

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Code Style

- Use TypeScript strict mode
- Follow atomic design principles
- Use functional components with hooks
- Memoize expensive components
- Add proper error handling

## Component Structure

```
components/
  atoms/        # Basic building blocks
  molecules/    # Component combinations
  organisms/    # Complex components
  ui/           # shadcn/ui components
```

## Performance Guidelines

- Use `React.memo` for components that receive props
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed as props
- Lazy load heavy components
- Optimize images and assets

## Testing

- Write unit tests for utility functions
- Test components in isolation
- Test responsive breakpoints
- Verify accessibility

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `style:` Code style changes
- `docs:` Documentation updates

