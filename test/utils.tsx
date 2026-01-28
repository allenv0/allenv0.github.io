import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

// Mock theme provider for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };

// Common test helpers
export const createMockProject = (overrides = {}) => ({
  cover: 'test.png',
  coverAlt: 'Test project',
  description: 'Test description',
  links: { 'Demo': 'https://example.com' },
  ...overrides,
});

export const createMockSocialLink = (overrides = {}) => ({
  name: 'test',
  href: 'https://test.com',
  icon: () => null,
  label: 'Test',
  ...overrides,
});

// Test helpers for common patterns
export const flushPromises = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};