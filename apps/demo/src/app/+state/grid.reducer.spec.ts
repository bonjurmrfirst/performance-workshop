import { GridLoaded } from './grid.actions';
import { GridState, Entity, initialState, gridReducer } from './grid.reducer';

describe('Grid Reducer', () => {
  const getGridId = it => it['id'];
  let createGrid;

  beforeEach(() => {
    createGrid = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Grid actions ', () => {
    it('should return set the list of known Grid', () => {
      const grids = [createGrid('PRODUCT-AAA'), createGrid('PRODUCT-zzz')];
      const action = new GridLoaded(grids);
      const result: GridState = gridReducer(initialState, action);
      const selId: string = getGridId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = gridReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
