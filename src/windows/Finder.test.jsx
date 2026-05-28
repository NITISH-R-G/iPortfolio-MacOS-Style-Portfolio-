import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FinderWindow from './Finder.jsx';
import useLocationStore from '../store/location.js';
import useWindowStore from '../store/window.js';
import { locations } from '../constants';

// Mock the stores
vi.mock('../store/location.js');
vi.mock('../store/window.js');

// Mock Lucide React icons and child components
vi.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
}));
vi.mock('../components', () => ({
  WindowControls: () => <div data-testid="window-controls" />,
}));
vi.mock('../hoc/WindowWrapper.jsx', () => ({
  default: (Component) => Component,
}));

describe('Finder', () => {
  const mockSetActiveLocation = vi.fn();
  const mockOpenWindow = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useLocationStore.mockReturnValue({
      activeLocation: locations.work,
      setActiveLocation: mockSetActiveLocation,
    });

    useWindowStore.mockReturnValue({
      openWindow: mockOpenWindow,
    });
  });

  it('renders sidebar lists correctly', () => {
    render(<FinderWindow />);

    // Verify list headers
    expect(screen.getByRole('heading', { name: 'Favorites' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument();

    // Verify an item from Favorites is rendered
    expect(screen.getByRole('button', { name: /About me/i })).toBeInTheDocument();

    // Verify an item from Work is rendered
    expect(screen.getAllByRole('button', { name: /Projects/i })[0]).toBeInTheDocument();
  });

  it('triggers setActiveLocation when a sidebar item is clicked', () => {
    render(<FinderWindow />);

    const aboutMeButton = screen.getByRole('button', { name: /About me/i });
    fireEvent.click(aboutMeButton);

    expect(mockSetActiveLocation).toHaveBeenCalledWith(locations.about);
  });

  it('renders content items of the active location', () => {
    render(<FinderWindow />);

    // locations.work has a child named "Projects"
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
  });

  it('opens a folder correctly when clicked from content', () => {
    render(<FinderWindow />);

    // Projects is a folder within activeLocation (work)
    const projectsButton = screen.getAllByRole('button', { name: /Projects/i })[1]; // Get the one in the content area
    fireEvent.click(projectsButton);

    expect(mockSetActiveLocation).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Projects', kind: 'folder' })
    );
  });

});
