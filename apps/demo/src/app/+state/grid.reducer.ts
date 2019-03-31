import { GridAction, GridActionTypes } from './grid.actions';
import { Target } from '@performance-workshop/shared';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const GRID_FEATURE_KEY = 'grid';

/**
 * Interface for the 'Grid' data used in
 *  - GridState, and
 *  - gridReducer
 *
 *  Note: replace if already defined in another module
 */

export interface GridState {
  grid: Target[];
  loaded: boolean;
}

export interface GridPartialState {
  readonly [GRID_FEATURE_KEY]: GridState;
}

export const initialState: GridState = {
  grid: [],
  loaded: false
};

export function gridReducer(
  state: GridState = initialState,
  action: GridAction
): GridState {
  switch (action.type) {
    case GridActionTypes.GridLoaded: {
      state = {
        ...state,
        grid: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}

export const getGridState = createFeatureSelector<GridState>(GRID_FEATURE_KEY);

export const getGrid = createSelector(getGridState, gridState => gridState.grid);
