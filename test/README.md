# Testing Setup

This directory contains the testing infrastructure for the project.

## Configuration

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Custom DOM matchers
- **Jest Environment**: JSDOM environment for DOM testing

## Setup Files

- `setup.js`: Global test setup file that configures jest-dom matchers
- `utils.tsx`: Custom render utilities and test helpers

## Test Structure

```
__tests__/
├── components/     # Component tests
├── config/        # Configuration file tests
├── hooks/         # Custom hook tests
└── page.test.tsx  # Page-level tests
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Testing Guidelines

1. **Test behavior, not implementation**: Focus on what the user sees and can do
2. **Use meaningful test names**: Describe the expected behavior
3. **Test happy paths and edge cases**: Ensure robust functionality
4. **Mock external dependencies**: Isolate the component under test
5. **Use custom render utilities**: Leverage the custom render with theme provider

## Test Utilities

### Custom Render
```tsx
import { render } from '@/test/utils';

// Automatically wraps components with ThemeProvider
render(<MyComponent />);
```

### Test Helpers
```tsx
import { createMockProject, createMockSocialLink } from '@/test/utils';

const mockProject = createMockProject({ name: 'Custom Project' });
```

## Example Component Test

```tsx
import { render, screen, fireEvent } from '@/test/utils';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Clicked!')).toBeInTheDocument();
  });
});
```