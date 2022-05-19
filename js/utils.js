const make2dArray = (columns, rows) => {
  const newArray = new Array(columns);
  for(var x = 0; x < columns; x++) {
    newArray[x] = new Array(rows);
  }

  return newArray;
};

// get grid coordinates from mouse position
const getGridCoorsFromMousePos = mouseEvent => {
  const rect = mouseEvent.target.getBoundingClientRect();

  let x = Math.floor((mouseEvent.clientX - rect.left) / TILE_SIZE);
  let y = Math.floor((mouseEvent.clientY - rect.top) / TILE_SIZE);

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x >= MAX_COLUMN) x = MAX_COLUMN - 1;
  if (y >= MAX_ROW) y = MAX_ROW - 1;

  return { x, y };
};