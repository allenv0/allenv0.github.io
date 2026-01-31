import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../app/page';

// Mock the components that depend on complex browser APIs
jest.mock('../app/components/HeroSection', () => {
  return function MockHeroSection({ onMacClick, onMacDoubleClick, showOrbit }: any) {
    return (
      <div data-testid="hero-section">
        <button
          onClick={onMacClick}
          onDoubleClick={onMacDoubleClick}
          data-testid="mac-button"
        >
          Mac Button
        </button>
        {showOrbit && <div data-testid="orbiting-images">Orbit</div>}
      </div>
    );
  };
});

jest.mock('../app/components/ProjectShowcase', () => {
  return function MockProjectShowcase({ show }: any) {
    if (!show) return null;
    return <div data-testid="project-showcase">Projects</div>;
  };
});

jest.mock('../app/components/SocialButtons', () => {
  return function MockSocialButtons({ show }: any) {
    if (!show) return null;
    return <div data-testid="social-buttons">Social</div>;
  };
});

jest.mock('../app/components/RetroTerminal', () => {
  return function MockRetroTerminal({ isOpen }: any) {
    if (!isOpen) return null;
    return <div data-testid="retro-terminal">Retro Terminal</div>;
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
    expect(screen.queryByTestId('retro-terminal')).not.toBeInTheDocument();
  });

  it('shows retro terminal when mac button is clicked', () => {
    render(<Page />);

    const macButton = screen.getByTestId('mac-button');
    fireEvent.click(macButton);

    expect(screen.getByTestId('retro-terminal')).toBeInTheDocument();
  });

  it('toggles orbit visibility when mac button is double-clicked', () => {
    render(<Page />);

    const macButton = screen.getByTestId('mac-button');

    // Initially orbit is visible
    expect(screen.getByTestId('orbiting-images')).toBeInTheDocument();

    // Double click - toggle orbit
    fireEvent.doubleClick(macButton);
    expect(screen.queryByTestId('orbiting-images')).not.toBeInTheDocument();

    // Double click again - toggle back
    fireEvent.doubleClick(macButton);
    expect(screen.getByTestId('orbiting-images')).toBeInTheDocument();
  });
});