import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WindowControls from './WindowControls';
import useWindowStore from '../store/window';

// Mock the window store
vi.mock('../store/window', () => ({
    default: vi.fn(),
}));

describe('WindowControls Component', () => {
    it('should render control buttons', () => {
        useWindowStore.mockReturnValue({ closeWindow: vi.fn() });
        render(<WindowControls target="test" />);

        expect(screen.getByLabelText('Close test window')).toBeInTheDocument();
        expect(screen.getByLabelText('Minimize test window')).toBeInTheDocument();
        expect(screen.getByLabelText('Maximize test window')).toBeInTheDocument();
    });

    it('should call closeWindow when close button is clicked', () => {
        const mockCloseWindow = vi.fn();
        useWindowStore.mockReturnValue({ closeWindow: mockCloseWindow });

        render(<WindowControls target="test" />);

        const closeButton = screen.getByLabelText('Close test window');
        fireEvent.click(closeButton);

        expect(mockCloseWindow).toHaveBeenCalledWith('test');
        expect(mockCloseWindow).toHaveBeenCalledTimes(1);
    });
});
