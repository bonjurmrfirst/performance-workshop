import { Entity, GridState } from './grid.reducer';
import { gridQuery } from './grid.selectors';

describe('Grid Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGridId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createGrid = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      grid: {
        list: [
          createGrid('PRODUCT-AAA'),
          createGrid('PRODUCT-BBB'),
          createGrid('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Grid Selectors', () => {
    it('getAllGrid() should return the list of Grid', () => {
      const results = gridQuery.getAllGrid(storeState);
      const selId = getGridId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedGrid() should return the selected Entity', () => {
      const result = gridQuery.getSelectedGrid(storeState);
      const selId = getGridId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = gridQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = gridQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
