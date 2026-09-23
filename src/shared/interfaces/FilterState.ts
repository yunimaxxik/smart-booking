export interface FilterState {
  hasProjector: boolean;
  hasWhiteboard: boolean;
  minCapacity: number;
  toggleProjector: () => void;
  toggleWhiteboard: () => void;
  setMinCapacity: (value: number) => void;
  resetFilters: () => void;
}
