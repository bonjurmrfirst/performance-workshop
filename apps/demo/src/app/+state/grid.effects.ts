import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { GridPartialState } from './grid.reducer';
import {
  LoadGrid,
  GridLoaded,
  GridLoadError,
  GridActionTypes
} from './grid.actions';

@Injectable()
export class GridEffects {
  @Effect() loadGrid$ = this.dataPersistence.fetch(GridActionTypes.LoadGrid, {
    run: (action: LoadGrid, state: GridPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new GridLoaded([]);
    },

    onError: (action: LoadGrid, error) => {
      console.error('Error', error);
      return new GridLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<GridPartialState>
  ) {}
}
