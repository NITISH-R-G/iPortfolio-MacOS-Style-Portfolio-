import { describe, it, expect, beforeEach } from 'vitest';
import useLocationStore from './location';
import { locations } from '../constants';

const DEFAULT_LOCATION = locations.work;

describe('useLocationStore', () => {
    beforeEach(() => {
        useLocationStore.getState().resetActiveLocation();
    });

    it('should initialize with default location', () => {
        const state = useLocationStore.getState();
        expect(state.activeLocation).toEqual(DEFAULT_LOCATION);
    });

    it('should set active location', () => {
        const state = useLocationStore.getState();
        state.setActiveLocation(locations.about);

        const newState = useLocationStore.getState();
        expect(newState.activeLocation).toEqual(locations.about);
    });

    it('should reset active location', () => {
        const state = useLocationStore.getState();
        state.setActiveLocation(locations.trash);
        expect(useLocationStore.getState().activeLocation).toEqual(locations.trash);

        useLocationStore.getState().resetActiveLocation();
        expect(useLocationStore.getState().activeLocation).toEqual(DEFAULT_LOCATION);
    });
});
