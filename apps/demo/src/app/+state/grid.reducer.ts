import { GridAction, GridActionTypes } from './grid.actions';

export const GRID_FEATURE_KEY = 'grid';

/**
 * Interface for the 'Grid' data used in
 *  - GridState, and
 *  - gridReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface GridState {
  list: Entity[]; // list of Grid; analogous to a sql normalized table
  selectedId?: string | number; // which Grid record has been selected
  loaded: boolean; // has the Grid list been loaded
  error?: any; // last none error (if any)
}

export interface GridPartialState {
  readonly [GRID_FEATURE_KEY]: GridState;
}

export const initialState: GridState = {
  list: [],
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
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
