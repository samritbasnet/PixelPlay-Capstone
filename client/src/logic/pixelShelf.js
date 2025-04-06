export const addToShelf = (game, shelf, onAdd) => {
  const alreadyAdded = shelf.find((g) => g.id === game.id);
  if (!alreadyAdded) {
    onAdd(game);
  }
};
