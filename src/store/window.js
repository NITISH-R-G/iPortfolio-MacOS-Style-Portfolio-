import { create } from 'zustand'
import {immer} from "zustand/middleware/immer";
import {INITIAL_Z_INDEX, WINDOW_CONFIG} from "../constants/index.js";

const useWindowStore = create(immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = true;
                win.isMinimized = false;
                win.zIndex = state.nextZIndex;
                if (data !== null) win.data = data;
                
                // Sweep to handle global focus
                Object.values(state.windows).forEach(w => w.isFocused = false);
                win.isFocused = true;
                
                state.nextZIndex++;
        }),

        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isOpen = false;
            win.isMinimized = false;
            win.isMaximized = false;
            win.isFocused = false;
            win.zIndex = INITIAL_Z_INDEX;
            // Retain data as per earlier feedback, but let's clear it if they close to reset the state completely? Wait, user asked to retain data on MINIMIZE, not on close. Close completely closes. Let's keep it null on close.
            win.data = null;
        }),

        minimizeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isMinimized = true;
            win.isFocused = false;
        }),

        toggleMaximizeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isMaximized = !win.isMaximized;
            win.zIndex = state.nextZIndex++;
            Object.values(state.windows).forEach(w => w.isFocused = false);
            win.isFocused = true;
        }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            
            // Sweep to handle global focus
            Object.values(state.windows).forEach(w => w.isFocused = false);
            
            win.isFocused = true;
            win.zIndex = state.nextZIndex++;
        }),

        setPreviousBounds: (windowKey, bounds) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.previousBounds = bounds;
        }),
        
        setScrollTop: (windowKey, scrollTop) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.scrollTop = scrollTop;
        }),

    })),
);

export default useWindowStore;
