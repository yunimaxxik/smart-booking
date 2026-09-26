import { create } from 'zustand';

import type { FilterState } from '../api/interfaces/FilterState';

export const useFilterStore = create<FilterState>((set) => ({
  hasProjector: false,
  hasWhiteboard: false,
  minCapacity: 1,
  toggleProjector: () =>
    set((state) => ({ hasProjector: !state.hasProjector })),
  toggleWhiteboard: () =>
    set((state) => ({ hasWhiteboard: !state.hasWhiteboard })),
  setMinCapacity: (value) => set({ minCapacity: value }),
  resetFilters: () =>
    set({ hasProjector: false, hasWhiteboard: false, minCapacity: 1 })
}));
