const buildDefaultFreighter = (grid) => {
  grid[0][10].updateTile(LARGE_ROOM, 0, true);

  grid[1][7].updateTile(LARGE_ROOM);
  grid[1][8].updateTile(LARGE_ROOM);
  grid[1][9].updateTile(LARGE_ROOM);
  grid[1][10].updateTile(LARGE_ROOM, 0, true);
  grid[1][11].updateTile(LARGE_ROOM);
  grid[1][12].updateTile(LARGE_ROOM);

  grid[2][9].updateTile(LARGE_ROOM);
  grid[2][10].updateTile(STAIRS_DOWN, 0, true);
  grid[2][12].updateTile(LARGE_ROOM);

  grid[3][9].updateTile(LARGE_ROOM);
  grid[3][12].updateTile(LARGE_ROOM);

  grid[4][7].updateTile(LARGE_ROOM);
  grid[4][8].updateTile(LARGE_ROOM);
  grid[4][9].updateTile(LARGE_ROOM);
  grid[4][10].updateTile(LARGE_ROOM);
  grid[4][11].updateTile(LARGE_ROOM);
  grid[4][12].updateTile(LARGE_ROOM);

  grid[5][9].updateTile(CORRIDOR);
  grid[5][11].updateTile(CORRIDOR);

  grid[6][9].updateTile(CORRIDOR);
  grid[6][11].updateTile(CORRIDOR);

  grid[7][9].updateTile(LARGE_ROOM);
  grid[7][10].updateTile(LARGE_ROOM);
  grid[7][11].updateTile(LARGE_ROOM);

  grid[8][8].updateTile(LARGE_ROOM);
  grid[8][9].updateTile(LARGE_ROOM);
  grid[8][10].updateTile(LARGE_ROOM);
  grid[8][11].updateTile(LARGE_ROOM);
  grid[8][12].updateTile(LARGE_ROOM);

  grid[9][8].updateTile(LARGE_ROOM);
  grid[9][9].updateTile(LARGE_ROOM);
  grid[9][10].updateTile(LARGE_ROOM);
  grid[9][11].updateTile(LARGE_ROOM);
  grid[9][12].updateTile(LARGE_ROOM);

  grid[10][8].updateTile(LARGE_ROOM);
  grid[10][9].updateTile(LARGE_ROOM);
  grid[10][10].updateTile(LARGE_ROOM);
  grid[10][11].updateTile(LARGE_ROOM);
  grid[10][12].updateTile(LARGE_ROOM);

  grid[11][8].updateTile(LARGE_ROOM);
  grid[11][9].updateTile(LARGE_ROOM);
  grid[11][10].updateTile(LARGE_ROOM);
  grid[11][11].updateTile(LARGE_ROOM);
  grid[11][12].updateTile(LARGE_ROOM);
}