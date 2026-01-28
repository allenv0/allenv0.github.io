# Test Strategy & Coverage Goals

## Overview

This document outlines the comprehensive testing strategy targeting **60%+ code coverage** on libs, utilities, and hooks.

## Test Structure

```
__tests__/
├── hooks/                 # React hooks tests
│   ├── useDebounce.test.ts
│   └── useKeyboardShortcut.test.ts
├── lib/                   # Utility functions tests
│   ├── searchIndex.test.ts
│   ├── mergeMetadata.test.ts
│   └── getBlurDataURL.test.ts
├── components/            # Component tests
├── config/               # Config tests
└── README.md
```

## Coverage Targets

### Hooks (100% target)
- **useDebounce**: Full coverage
  - Value debouncing with delays
  - Timer cleanup on unmount
  - Multiple rapid updates
  - Type safety (strings, numbers, objects)

- **useKeyboardShortcut**: Full coverage
  - Single key detection
  - Modifier combinations (ctrl, alt, shift, meta)
  - Case-insensitive matching
  - preventDefault behavior
  - Dynamic enable/disable
  - Event listener cleanup

### Utilities (100% target)

- **searchIndex.ts**:
  - Empty query handling (high-priority filtering)
  - Exact match scoring
  - Prefix match detection
  - Substring/contains matching
  - Fuzzy matching algorithm
  - Tag-based searching
  - Priority weighting
  - Result limiting (max 10 items)
  - Edge cases (whitespace, special chars, long queries)

- **mergeMetadata.ts**:
  - Default metadata generation
  - Custom title/description application
  - Custom image handling
  - Base URL resolution (env var fallback chain)
  - OpenGraph and Twitter card generation
  - Favicon configuration
  - Combined options merging
  - Edge cases (empty strings, very long values)

- **getBlurDataURL.ts**:
  - Sharp integration with mocking
  - Image resizing to 10x10
  - Buffer to base64 conversion
  - Data URL formatting
  - Error handling
  - Consistent output for same image
  - Multiple file types

## Running Tests

```bash
# Run all tests
npm run test

# Run in watch mode (development)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test -- searchIndex.test.ts

# Run tests matching pattern
npm run test -- --testNamePattern="useDebounce"
```

## Coverage Report

After running `npm run test:coverage`, view the HTML report:

```bash
open coverage/lcov-report/index.html
```

## Test Patterns Used

### 1. Hook Testing
- `renderHook` for isolated hook testing
- Timer mocking for async operations
- Event listener mocking
- Props updates via `rerender`

### 2. Utility Testing
- Pure function testing
- Edge case coverage
- Environment variable mocking
- Buffer/binary data mocking

### 3. Integration Patterns
- Mock external dependencies (sharp, path)
- Test return value types
- Verify function call sequences
- Error scenario testing

## Adding New Tests

When adding new utilities or hooks:

1. Create test file in appropriate directory
2. Follow naming: `<name>.test.ts` or `<name>.test.tsx`
3. Aim for minimum 85% line coverage per file
4. Include edge cases and error scenarios
5. Use descriptive test names with nested `describe` blocks

### Test Template

```typescript
import { functionName } from '@/lib/functionName';

describe('functionName', () => {
  describe('basic functionality', () => {
    it('should do the primary thing', () => {
      const result = functionName(input);
      expect(result).toEqual(expected);
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      const result = functionName('');
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should throw on invalid input', () => {
      expect(() => functionName(null)).toThrow();
    });
  });
});
```

## Mocking Strategy

### Module Mocks
- Use `jest.mock()` for external dependencies
- Place mocks at top of test file
- Reset mocks in `beforeEach()`

### Timer Mocks
- Use `jest.useFakeTimers()` for debounce/throttle
- `jest.advanceTimersByTime()` to move time forward
- Always restore with `jest.useRealTimers()`

### Event Mocks
- Spy on `window.addEventListener` / `removeEventListener`
- Create real `Event` objects for dispatch
- Use `dispatchEvent()` for realistic testing

## CI/CD Integration

Tests should run in CI with:

```bash
npm run test -- --coverage --watchAll=false
```

Fail CI if coverage drops below 60%.

## Future Improvements

- [ ] Add component snapshot tests
- [ ] Add visual regression tests for UI components
- [ ] Add E2E tests for search functionality
- [ ] Add performance benchmarks for searchIndex
- [ ] Add mutation testing
- [ ] Increase coverage to 80%+ on all modules

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
