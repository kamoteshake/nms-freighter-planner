let grid = make2dArray(MAX_COLUMN, MAX_ROW);
let storageUnitCount = parseInt(localStorage.getItem('storageUnitCount') ?? 0)
let orbitalExocraftMaterializerCount = parseInt(localStorage.getItem('orbitalExocraftMaterializerCount') ?? 0);
let currentFloor = parseInt(localStorage.getItem('currentFloor') ?? 0);
let currentType = EMPTY;
let currentRotation = 0;
const tilePreview = new Tile(0, 0, currentRotation, currentType, false, 'tilePreview');

const handleRoomButton = e => {
  const type = e.getAttribute('data-type');

  currentType = type;

  // reset the rotation when choosing a new floor type
  currentRotation = 0

  updateTilePreview();
};

const handleRotate = direction => {
  const newRotation = currentRotation + (direction * 90);

  if(newRotation >= 360) {
    currentRotation = 0;
  }
  else if(newRotation < 0) {
    currentRotation = 270;
  }
  else {
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
  const floors = JSON.parse(localStorage.getItem('floors') ?? '{}');

  // add or overwrite the current floor
  floors[`floor_${currentFloor}`] = grid;

  // save the new floors
  localStorage.setItem('floors', JSON.stringify(floors));
};

const handleFloorButtonClick = direction => {
  if (direction === 'previous') {
    currentFloor -= 1;
  }
  else {
    currentFloor += 1;
  }

  renderContent();
};

const handlePreviousFloor = () => {
  currentFloor -= 1;

  localStorage.setItem('currentFloor', currentFloor);

  renderContent();
};

const handleNextFloor = () => {
  currentFloor += 1;

  localStorage.setItem('currentFloor', currentFloor);

  renderContent();
};

const handleTableClick = e => {
  if (!e.target.className.includes('tile')) return;

  // check if the left button is clicked or down
  if (e.buttons === 1) {
    // to support older browser, I'm using getAttribute
    var x = parseInt(e.target.getAttribute('data-x'));
    var y = parseInt(e.target.getAttribute('data-y'));
    
    const tile = grid[x][y];

    // add storage unit count
    if (currentType === STORAGE_UNIT) {
      if (storageUnitCount === MAX_STORAGE_UNIT) return;

      storageUnitCount += 1;
      localStorage.setItem('storageUnitCount', storageUnitCount);
      
      updateStorageUnitButton();
    }

    // subtract storage unit count when removing storage unit room
    if (tile.type === STORAGE_UNIT && currentType !== STORAGE_UNIT) {
      storageUnitCount -= 1;
      localStorage.setItem('storageUnitCount', storageUnitCount);

      updateStorageUnitButton();
    }

    // add orbital exocraft materializer count
    if (currentType === ORBITAL_EXOCRAFT_MATERIALIZER) {
      if (orbitalExocraftMaterializerCount === MAX_ORBITAL_EXOCRAFT_MATERIALIZER) return;

      orbitalExocraftMaterializerCount += 1;
      localStorage.setItem('orbitalExocraftMaterializerCount', orbitalExocraftMaterializerCount);
      
      updateOrbitalExocraftMaterializerButton();
    }

    // subtract storage unit count when removing storage unit room
    if (tile.type === ORBITAL_EXOCRAFT_MATERIALIZER && currentType !== ORBITAL_EXOCRAFT_MATERIALIZER) {
      orbitalExocraftMaterializerCount -= 1;
      localStorage.setItem('orbitalExocraftMaterializerCount', orbitalExocraftMaterializerCount);

      updateOrbitalExocraftMaterializerButton();
    }

    tile.updateTile(currentType, currentRotation);
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
}

const updateStorageUnitButton = () => {
  const storageUnitButton = document.getElementById('storageUnitButton');

  if (storageUnitCount === MAX_STORAGE_UNIT && !storageUnitButton.disabled) {
    storageUnitButton.disabled = true;
  }
  if (storageUnitCount !== MAX_STORAGE_UNIT && storageUnitButton.disabled) {
    storageUnitButton.disabled = false;
  }

  storageUnitButton.getElementsByTagName('span')[0].innerText = `Storage Unit (${MAX_STORAGE_UNIT - storageUnitCount})`;
};

const updateOrbitalExocraftMaterializerButton = () => {
  const orbitalExocraftMaterializerButton = document.getElementById('orbitalExocraftMaterializerButton');

  if (orbitalExocraftMaterializerCount === MAX_ORBITAL_EXOCRAFT_MATERIALIZER && !orbitalExocraftMaterializerButton.disabled) {
    orbitalExocraftMaterializerButton.disabled = true;
  }
  if (orbitalExocraftMaterializerCount !== MAX_ORBITAL_EXOCRAFT_MATERIALIZER && orbitalExocraftMaterializerButton.disabled) {
    orbitalExocraftMaterializerButton.disabled = false;
  }

  orbitalExocraftMaterializerButton.getElementsByTagName('span')[0].innerText = `Orbital Exocraft Materializer (${MAX_ORBITAL_EXOCRAFT_MATERIALIZER - orbitalExocraftMaterializerCount})`;
};

const updateTilePreview = () => {
  // if the tile preview has the same type and rotation, do nothing
  if (tilePreview.type === currentType && tilePreview.rotation === currentRotation) return;

  tilePreview.updateTile(currentType, currentRotation);
  tilePreview.draw();
};

let lastHovered = { x: null, y: null };

const handleMouseMove = e => {
  const { x, y } = getGridCoorsFromMousePos(e);

  // if the mouse is moving in the same tile, do nothing
  if (lastHovered.x === x && lastHovered.y === y) return;

  // clear the hover state of the previous hovered tile
  if (lastHovered.x !== null && lastHovered.y !== null) {
    const lastHoveredTile = grid[lastHovered.x][lastHovered.y];
    lastHoveredTile.mouseExit();
    lastHoveredTile.draw();
  }

  const hoveredTile = grid[x][y];
  
  // if the left button is clicked, 
  if(e.buttons === 1) {
    // update the the hovered tile if it does not have the same type or rotation
    if (hoveredTile.type !== currentType || hoveredTile.rotation !== currentRotation) {
      hoveredTile.updateTile(currentType, currentRotation);
    }
  }

  // update the hover state of the hovered tile
  hoveredTile.mouseEnter();
  hoveredTile.draw();

  lastHovered = { x, y };
};

const handleMouseLeave = () => {
  // clears the last hovered tile when the mouse is not on the canvas
  if (lastHovered.x !== null && lastHovered.y !== null) {
    const lastHoveredTile = grid[lastHovered.x][lastHovered.y];
    lastHoveredTile.mouseExit();
    lastHoveredTile.draw();
  }
};

const handleMouseDown = e => {
  const { x, y } = getGridCoorsFromMousePos(e);

  if (e.buttons === 1) {
    const clickedTile = grid[x][y];

    // if the clicked tile has the same type and rotation, do nothing
    if (clickedTile.type === currentType && clickedTile.rotation === currentRotation) return;

    clickedTile.updateTile(currentType, currentRotation);
    clickedTile.draw();
  }
};

const populateGrid = () => {
  // get saved grid
  let newGrid = JSON.parse(localStorage.getItem('floors') ?? '{}')[`floor_${currentFloor}`]
    ?.map(row => row.map(tile => new Tile(tile.x, tile.y, tile.rotation, tile.type, tile.isFixed)));

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

  // draw the grid
  draw(newGrid);
};

const draw = newGrid => {
  // draw each tiles
  newGrid.forEach(newTiles => {
    newTiles.forEach(newTile => {
      const oldTile = grid[newTile.x][newTile.y];
      if (oldTile?.type === newTile.type && oldTile?.rotation === newTile.rotation && oldTile?.isFixed === newTile.isFixed) return;
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
  // setup canvas
  const canvas = document.getElementById('canvas');
  canvas.setAttribute('width', TILE_SIZE * MAX_COLUMN);
  canvas.setAttribute('height', TILE_SIZE * MAX_ROW);

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  // setup tile preview canvas
  const tilePreviewCanvas = document.getElementById('tilePreview');
  tilePreviewCanvas.setAttribute('width', TILE_SIZE);
  tilePreviewCanvas.setAttribute('height', TILE_SIZE);

  // draw tile preview
  tilePreview.draw();

  renderContent();
};

document.addEventListener('DOMContentLoaded', initiate);