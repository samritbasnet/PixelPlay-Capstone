import { addToShelf } from '../logic/pixelShelf';

describe('addToShelf', () => {
  const game = { id: 1, title: 'Zelda' };

  it('adds game if not already on shelf', () => {
    const mockAdd = vi.fn();
    addToShelf(game, [], mockAdd);

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith(game);
  });

  it('does NOT add game if already on shelf', () => {
    const mockAdd = vi.fn();
    const shelf = [{ id: 1, title: 'Zelda' }];
    addToShelf(game, shelf, mockAdd);

    expect(mockAdd).not.toHaveBeenCalled();
  });
});
