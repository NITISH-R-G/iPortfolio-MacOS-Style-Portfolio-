import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Finder from './Finder';
import useLocationStore from '../store/location';
import useWindowStore from '../store/window';

// Mock stores
vi.mock('../store/location', () => ({
    default: vi.fn(),
}));

vi.mock('../store/window', () => ({
    default: vi.fn(),
}));

vi.mock('lucide-react', () => ({
    Search: () => <div data-testid="search-icon" />
}));

vi.mock('../components', () => ({
    WindowControls: ({ target }) => <div data-testid={`window-controls-${target}`} />
}));

vi.mock('../hoc/WindowWrapper.jsx', () => ({
    default: (Component) => Component
}));

describe('Finder Component', () => {
    const mockSetActiveLocation = vi.fn();
    const mockOpenWindow = vi.fn();

    const mockLocationData = {
        id: 1,
        title: "Test Active Location",
        children: [
            { id: 10, name: "Folder 1", kind: "folder", icon: "folder.png" },
            { id: 11, name: "Resume", kind: "file", fileType: "pdf", icon: "pdf.png" },
            { id: 12, name: "Note", kind: "file", fileType: "txt", icon: "txt.png" },
            { id: 13, name: "Link", kind: "file", fileType: "url", href: "https://example.com", icon: "url.png" }
        ]
    };

    beforeEach(() => {
        vi.clearAllMocks();

        useLocationStore.mockReturnValue({
            activeLocation: mockLocationData,
            setActiveLocation: mockSetActiveLocation
        });

        useWindowStore.mockReturnValue({
            openWindow: mockOpenWindow
        });

        // Mock window.open
        window.open = vi.fn();
    });

    it('renders sidebar and content', () => {
        render(<Finder />);

        expect(screen.getByTestId('window-controls-finder')).toBeInTheDocument();
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();

        // Verify sidebar headers
        const favoritesHeaders = screen.getAllByText('Favorites');
        expect(favoritesHeaders.length).toBeGreaterThan(0);

        // Children of active location
        expect(screen.getByText('Folder 1')).toBeInTheDocument();
        expect(screen.getByText('Note')).toBeInTheDocument();
    });

    it('calls setActiveLocation when a sidebar item is clicked', () => {
        render(<Finder />);

        // Find a button in the sidebar (e.g., Work or Favorites)
        // Since we didn't mock the locations constant, it uses the actual constants
        const workLocationBtn = screen.getByLabelText('Open Work');
        fireEvent.click(workLocationBtn);

        expect(mockSetActiveLocation).toHaveBeenCalled();
    });

    it('opens item correctly based on type', () => {
        render(<Finder />);

        // Click on Folder
        fireEvent.click(screen.getByLabelText('Open Folder 1'));
        expect(mockSetActiveLocation).toHaveBeenCalledWith(mockLocationData.children[0]);

        // Click on Resume (pdf)
        const resumeBtns = screen.getAllByLabelText('Open Resume');
        // Click the one in the main content area (second one usually)
        fireEvent.click(resumeBtns[resumeBtns.length - 1]);
        expect(mockOpenWindow).toHaveBeenCalledWith("resume");

        // Click on Note (txt)
        fireEvent.click(screen.getByLabelText('Open Note'));
        expect(mockOpenWindow).toHaveBeenCalledWith("txtfile", mockLocationData.children[2]);

        // Click on Link (url)
        fireEvent.click(screen.getByLabelText('Open Link'));
        expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");
    });
});
