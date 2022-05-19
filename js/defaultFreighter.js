const buildDefaultFreighter = () => {
  const grid = make2dArray(MAX_COLUMN, MAX_ROW)
  // create empty grid
  for(let x = 0; x < MAX_COLUMN; x++) {
    for(let y = 0; y < MAX_ROW; y++) {
      const newTile = new Tile(x, y, 0, EMPTY, false);
      grid[x][y] = newTile;
    }
  }

  grid[10][0].updateTile(LARGE_ROOM, 0, true);

  grid[7][1].updateTile(LARGE_ROOM);
  grid[8][1].updateTile(LARGE_ROOM);
  grid[9][1].updateTile(LARGE_ROOM);
  grid[10][1].updateTile(LARGE_ROOM, 0, true);
  grid[11][1].updateTile(LARGE_ROOM);
  grid[12][1].updateTile(LARGE_ROOM);

  grid[9][2].updateTile(LARGE_ROOM);
  grid[10][2].updateTile(STAIRS_DOWN, 0, true);
  grid[12][2].updateTile(LARGE_ROOM);

  grid[9][3].updateTile(LARGE_ROOM);
  grid[12][3].updateTile(LARGE_ROOM);

  grid[7][4].updateTile(LARGE_ROOM);
  grid[8][4].updateTile(LARGE_ROOM);
  grid[9][4].updateTile(LARGE_ROOM);
  grid[10][4].updateTile(LARGE_ROOM);
  grid[11][4].updateTile(LARGE_ROOM);
  grid[12][4].updateTile(LARGE_ROOM);

  grid[9][5].updateTile(CORRIDOR);
  grid[11][5].updateTile(CORRIDOR);

  grid[9][6].updateTile(CORRIDOR);
  grid[11][6].updateTile(CORRIDOR);

  grid[9][7].updateTile(LARGE_ROOM);
  grid[10][7].updateTile(LARGE_ROOM);
  grid[11][7].updateTile(LARGE_ROOM);

  grid[8][8].updateTile(LARGE_ROOM);
  grid[9][8].updateTile(LARGE_ROOM);
  grid[10][8].updateTile(LARGE_ROOM);
  grid[11][8].updateTile(LARGE_ROOM);
  grid[12][8].updateTile(LARGE_ROOM);

  grid[8][9].updateTile(LARGE_ROOM);
  grid[9][9].updateTile(LARGE_ROOM);
  grid[10][9].updateTile(LARGE_ROOM);
  grid[11][9].updateTile(LARGE_ROOM);
  grid[12][9].updateTile(LARGE_ROOM);

  grid[8][10].updateTile(LARGE_ROOM);
  grid[9][10].updateTile(LARGE_ROOM);
  grid[10][10].updateTile(LARGE_ROOM);
  grid[11][10].updateTile(LARGE_ROOM);
  grid[12][10].updateTile(LARGE_ROOM);

  grid[8][11].updateTile(LARGE_ROOM);
  grid[9][11].updateTile(LARGE_ROOM);
  grid[10][11].updateTile(LARGE_ROOM);
  grid[11][11].updateTile(LARGE_ROOM);
  grid[12][11].updateTile(LARGE_ROOM);

  return grid;
};