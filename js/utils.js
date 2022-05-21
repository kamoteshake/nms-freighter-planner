const make2dArray = (columns, rows) => {
  const newArray = new Array(columns);
  for(var x = 0; x < columns; x++) {
    newArray[x] = new Array(rows);
  }

  return newArray;
};

const createEmptyGrid = () => {
  const grid = make2dArray(MAX_COLUMN, MAX_ROW);

  // create empty grid
  for(let x = 0; x < MAX_COLUMN; x++) {
    for(let y = 0; y < MAX_ROW; y++) {
      const newTile = new Tile(x, y, 0, EMPTY, false);
      grid[x][y] = newTile;
    }
  }

  return grid;
};