let grid = make2dArray(MAX_COLUMN, MAX_ROW);
let currentFloor = parseInt(localStorage.getItem('currentFloor') ?? 0);
let currentType = EMPTY;
let currentRotation = 0;
const tilePreview = new Tile(0, 0, currentRotation, currentType, false, true);

const handleRoomButton = e => {
  const type = e.getAttribute('data-type');

  currentType = type;

  // reset the rotation when choosing a new floor type
  currentRotation = 0

  updateTilePreview();
};

const handleRotate = direction => {
  let newRotation = currentRotation;

  if (direction === 'clockwise') {
    newRotation += 90;
  }
  else if (direction === 'counterClockwise') {
    newRotation -= 90; 
  }

  if(newRotation >= 360) {
    currentRotation = 0;
  } 
  else if(newRotation < 0) {
    currentRotation = 270;
  } else {
    currentRotation = newRotation;
  }

  updateTilePreview();
};

const handleDeleteTile = () => {
  currentType = EMPTY;
  currentRotation = 0;

  updateTilePreview();
};

const handleSaveFloor = () => {
  // get the saved floors
  const floors = getFloors() ?? {};

  // add or overwrite the current floor
  floors[`floor_${currentFloor}`] = grid;

  // save the new floors
  localStorage.setItem('floors', JSON.stringify(floors));
};

const handleFloorButtonClick = direction => {
  if (direction === 'previous') {
    currentFloor -= 1;
  }
  else if (direction === 'next') {
    currentFloor += 1;
  }

  localStorage.setItem('currentFloor', currentFloor);

  renderContent();
};

const handleTableClick = e => {
  if (!e.target.className.includes('tile')) return;

  // check if the left button is clicked or down
  if (e.buttons === 1) {
    // using getAttribute to support older browser
    var x = parseInt(e.target.getAttribute('data-x'));
    var y = parseInt(e.target.getAttribute('data-y'));
    
    const clickedTile = grid[x][y];

    // if the clicked tile is the same, do nothing
    if (clickedTile.type === currentType && clickedTile.rotation === currentRotation) return;

    // if the currentType already hits the room limit, do nothing
    const tilesCount = getTilesCount();
    const typeCount = tilesCount?.[currentType] ?? 0;
    const typeLimit = ROOM_LIMITS.find(room => room.type === currentType);
    if (currentType !== EMPTY && typeCount === typeLimit?.limit) return;

    clickedTile.updateTile(currentType, currentRotation);
    clickedTile.draw();

    updateRoomButtonsWithLimit();
  }
};

const updateFloorControl = () => {
  // update floor label
  const floorLabel = document.getElementById('floorLabel');
  floorLabel.innerText = `Floor ${currentFloor + 1}`;

  // update floor buttons
  const previousFloorButton = document.getElementById('previousFloorButton');
  const nextFloorButton = document.getElementById('nextFloorButton');

  if (currentFloor === 0) {
    previousFloorButton.disabled = true;
  }
  else if (currentFloor === MAX_FLOOR - 1) {
    nextFloorButton.disabled = true;
  }
  else {
    if (previousFloorButton.disabled) {
      previousFloorButton.disabled = false;
    }
    if (nextFloorButton.disabled) {
      nextFloorButton.disabled = false;
    }
  }
};

const updateRoomButtonsWithLimit = () => {
  const tilesCount = getTilesCount();

  ROOM_LIMITS.forEach(room => {
    const buttonElement = document.querySelector(`[data-type="${room.type}"]`);

    const roomTypeCount = tilesCount?.[room.type] ?? 0;

    // disable button
    if (roomTypeCount === room.limit && !buttonElement.disabled) {
      buttonElement.disabled = true;
    }

    // enable the button
    if (roomTypeCount !== room.limit && buttonElement.disabled) {
      buttonElement.disabled = false;
    }

    // update the button text to add remaining rooms available
    let buttonText = buttonElement.getElementsByClassName('availableRoomsCount')[0];
    buttonText.innerHTML = `&nbsp;(${room.limit - roomTypeCount})`;
  });
};

const updateTilePreview = () => {
  tilePreview.updateTile(currentType, currentRotation);
  tilePreview.draw();
};

const populateGrid = () => {
  // get saved floors
  const floors = getFloors();
  let newGrid = floors?.[`floor_${currentFloor}`]
    ?.map(tiles => tiles.map(tile => new Tile(tile.x, tile.y, tile.rotation, tile.type, tile.isFixed)));

  // if there are no saved floor
  if (!newGrid?.length) {
    // if it's the first floor
    if (currentFloor === 0) {
      // build the default freighter layout
      newGrid = buildDefaultFreighter();
    }
    else {
      // create empty grid
      newGrid = createEmptyGrid();
    }
  }

  draw(newGrid);
};

const draw = newGrid => {
  newGrid.forEach(newTiles => {
    newTiles.forEach(newTile => {
      const currentTile = grid[newTile.x][newTile.y];
      // only update id the tile in the grid is different
      if (currentTile?.type === newTile.type && currentTile?.rotation === newTile.rotation && currentTile?.isFixed === newTile.isFixed) return;
      
      newTile.draw();
      grid[newTile.x][newTile.y] = newTile;
    })
  })
};

const renderContent = () => {
  updateFloorControl();
  populateGrid();
}

const initiate = () => {
  // build empty grid
  const gridTable = document.getElementById('gridTable');
  const tableBody = document.createElement('tbody');

  tableBody.addEventListener('mousedown', handleTableClick);
  tableBody.addEventListener('mouseover', handleTableClick);

  // create row (y)
  for(let row = 0; row < MAX_ROW; row++) {
    const tableRow = document.createElement('tr');

    // create column (x)
    for(let column = 0; column < MAX_COLUMN; column++) {
      const tableColumn = document.createElement('td');
      tableColumn.id = `tile_${column}_${row}`;

      tableRow.appendChild(tableColumn);
    }

    tableBody.appendChild(tableRow);
  }

  gridTable.appendChild(tableBody);

  // draw tile preview
  tilePreview.draw()

  renderContent();
  countTiles(grid);
  updateRoomButtonsWithLimit();
};

document.addEventListener('DOMContentLoaded', initiate);