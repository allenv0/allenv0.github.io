import { render, screen } from '@testing-library/react';
import StyledStrong from '@/app/components/StyledStrong';

describe('StyledStrong', () => {
  it('renders children correctly', () => {
    render(<StyledStrong>Hello World</StyledStrong>);
    const element = screen.getByText('Hello World');
    expect(element).toBeInTheDocument();
  });

  it('applies correct classes for dark mode', () => {
    render(<StyledStrong>Test Text</StyledStrong>);
    const element = screen.getByText('Test Text');
    expect(element).toHaveClass('font-semibold');
    expect(element).toHaveClass('dark:bg-gradient-to-r');
    expect(element).toHaveClass('dark:from-purple-500');
    expect(element).toHaveClass('dark:to-blue-500');
    expect(element).toHaveClass('dark:bg-clip-text');
    expect(element).toHaveClass('dark:text-transparent');
    expect(element).toHaveClass('print:text-inherit');
  });

  it('renders as a strong element', () => {
    render(<StyledStrong>Important</StyledStrong>);
    const element = screen.getByText('Important');
    expect(element.tagName).toBe('STRONG');
  });
});