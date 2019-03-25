import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { GridEffects } from './grid.effects';
import { LoadGrid, GridLoaded } from './grid.actions';

describe('GridEffects', () => {
  let actions: Observable<any>;
  let effects: GridEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        GridEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(GridEffects);
  });

  describe('loadGrid$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadGrid() });
      expect(effects.loadGrid$).toBeObservable(
        hot('-a-|', { a: new GridLoaded([]) })
      );
    });
  });
});
