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

const getFloors = () => JSON.parse(localStorage.getItem('floors') ?? '{}')

const getTilesCount = () => JSON.parse(localStorage.getItem('tilesCount') ?? '{}');

const countTiles = () => {
  const tilesCount = {};
  const floors = getFloors();

  Object.values(floors).forEach(floor => {
    floor.forEach(tiles => {
      tiles.forEach(tile => {
        // skip if tile is empty
        if (tile.type === EMPTY) return;

        // get count of the same tile
        let currentTileCount = tilesCount[tile.type] ?? 0;

        tilesCount[tile.type] = currentTileCount + 1;
      });
    });
  });

  localStorage.setItem('tilesCount', JSON.stringify(tilesCount));
};