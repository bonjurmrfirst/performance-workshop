import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GRID_FEATURE_KEY, GridState } from './grid.reducer';

// Lookup the 'Grid' feature state managed by NgRx
const getGridState = createFeatureSelector<GridState>(GRID_FEATURE_KEY);

const getLoaded = createSelector(
  getGridState,
  (state: GridState) => state.loaded
);
const getError = createSelector(
  getGridState,
  (state: GridState) => state.error
);

const getAllGrid = createSelector(
  getGridState,
  getLoaded,
  (state: GridState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getGridState,
  (state: GridState) => state.selectedId
);
const getSelectedGrid = createSelector(
  getAllGrid,
  getSelectedId,
  (grid, id) => {
    const result = grid.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const gridQuery = {
  getLoaded,
  getError,
  getAllGrid,
  getSelectedGrid
};
