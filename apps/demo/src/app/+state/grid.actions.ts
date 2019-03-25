import { Action } from '@ngrx/store';
import { Entity } from './grid.reducer';

export enum GridActionTypes {
  LoadGrid = '[Grid] Load Grid',
  GridLoaded = '[Grid] Grid Loaded',
  GridLoadError = '[Grid] Grid Load Error'
}

export class LoadGrid implements Action {
  readonly type = GridActionTypes.LoadGrid;
}

export class GridLoadError implements Action {
  readonly type = GridActionTypes.GridLoadError;
  constructor(public payload: any) {}
}

export class GridLoaded implements Action {
  readonly type = GridActionTypes.GridLoaded;
  constructor(public payload: Entity[]) {}
}

export type GridAction = LoadGrid | GridLoaded | GridLoadError;

export const fromGridActions = {
  LoadGrid,
  GridLoaded,
  GridLoadError
};
