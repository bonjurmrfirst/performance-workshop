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
import { GridHttpService } from '../services/grid-http.service';
import { Target } from '@performance-workshop/shared';
import { map } from 'rxjs/operators';

@Injectable()
export class GridEffects {
  @Effect() loadGrid$ = this.dataPersistence.fetch(GridActionTypes.LoadGrid, {
    run: (action: LoadGrid, state: GridPartialState) => {

      return this.gridHttpService.get().pipe(
        map((targets: Target[]) => new GridLoaded(targets))
      );
    },

    onError: (action: LoadGrid, error) => {
      console.error('Error', error);

      return new GridLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<GridPartialState>,
    private gridHttpService: GridHttpService
  ) {}
}
