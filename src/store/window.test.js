import { describe, it, expect, beforeEach } from 'vitest';
import useWindowStore from './window';
import { INITIAL_Z_INDEX } from '../constants/index';

describe('useWindowStore', () => {
    beforeEach(() => {
        // Reset the store before each test if needed
        const state = useWindowStore.getState();
        Object.keys(state.windows).forEach(key => {
            state.closeWindow(key);
        });
    });

    it('should open a window and update zIndex', () => {
        const store = useWindowStore.getState();
        const initialZIndex = store.nextZIndex;

        store.openWindow('safari', { url: 'https://example.com' });

        const newState = useWindowStore.getState();
        expect(newState.windows['safari'].isOpen).toBe(true);
        expect(newState.windows['safari'].data).toEqual({ url: 'https://example.com' });
        expect(newState.windows['safari'].zIndex).toBe(initialZIndex);
        expect(newState.nextZIndex).toBe(initialZIndex + 1);
    });

    it('should close a window and reset zIndex', () => {
        const store = useWindowStore.getState();
        store.openWindow('terminal');

        let newState = useWindowStore.getState();
        expect(newState.windows['terminal'].isOpen).toBe(true);

        newState.closeWindow('terminal');
        newState = useWindowStore.getState();
        expect(newState.windows['terminal'].isOpen).toBe(false);
        expect(newState.windows['terminal'].data).toBeNull();
        expect(newState.windows['terminal'].zIndex).toBe(INITIAL_Z_INDEX);
    });

    it('should focus a window and increment nextZIndex', () => {
        const store = useWindowStore.getState();
        store.openWindow('contact');

        const focusInitialZIndex = useWindowStore.getState().nextZIndex;
        useWindowStore.getState().focusWindow('contact');

        const newState = useWindowStore.getState();
        expect(newState.windows['contact'].zIndex).toBe(focusInitialZIndex);
        expect(newState.nextZIndex).toBe(focusInitialZIndex + 1);
    });
});
