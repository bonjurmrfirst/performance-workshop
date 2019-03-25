import { GridAction, GridActionTypes } from './grid.actions';
import { Target } from '@performance-workshop/shared';

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
