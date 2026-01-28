import { render, screen, fireEvent } from '@testing-library/react';
import Page from '@/app/page';

// Mock the components that depend on complex browser APIs
jest.mock('@/app/components/HeroSection', () => {
  return function MockHeroSection({ onMacClick, showOrbit }: any) {
    return (
      <div data-testid="hero-section">
        <button
          onClick={onMacClick}
          data-testid="mac-button"
        >
          Mac Button
        </button>
        {showOrbit && <div data-testid="orbiting-images">Orbit</div>}
      </div>
    );
  };
});

jest.mock('@/app/components/ProjectShowcase', () => {
  return function MockProjectShowcase({ show }: any) {
    if (!show) return null;
    return <div data-testid="project-showcase">Projects</div>;
  };
});

jest.mock('@/app/components/SocialButtons', () => {
  return function MockSocialButtons({ show }: any) {
    if (!show) return null;
    return <div data-testid="social-buttons">Social</div>;
  };
});

describe('Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero section initially', () => {
    render(<Page />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('mac-button')).toBeInTheDocument();
    expect(screen.getByTestId('orbiting-images')).toBeInTheDocument();
  });

  it('does not show project showcase or social buttons initially', () => {
    render(<Page />);
    expect(screen.queryByTestId('project-showcase')).not.toBeInTheDocument();
    expect(screen.queryByTestId('social-buttons')).not.toBeInTheDocument();
  });

  it('shows project showcase and social buttons when mac button is clicked', () => {
    render(<Page />);

    const macButton = screen.getByTestId('mac-button');
    fireEvent.click(macButton);

    expect(screen.getByTestId('project-showcase')).toBeInTheDocument();
    expect(screen.getByTestId('social-buttons')).toBeInTheDocument();
    expect(screen.queryByTestId('orbiting-images')).not.toBeInTheDocument();
  });

  it('hides project showcase and social buttons when mac button is clicked again', () => {
    render(<Page />);

    const macButton = screen.getByTestId('mac-button');

    // First click - show elements
    fireEvent.click(macButton);
    expect(screen.getByTestId('project-showcase')).toBeInTheDocument();
    expect(screen.getByTestId('social-buttons')).toBeInTheDocument();
    expect(screen.queryByTestId('orbiting-images')).not.toBeInTheDocument();

    // Second click - hide elements
    fireEvent.click(macButton);
    expect(screen.queryByTestId('project-showcase')).not.toBeInTheDocument();
    expect(screen.queryByTestId('social-buttons')).not.toBeInTheDocument();
    expect(screen.getByTestId('orbiting-images')).toBeInTheDocument();
  });
});