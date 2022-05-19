let grid = make2dArray(MAX_COLUMN, MAX_ROW);
let storageUnitCount = parseInt(localStorage.getItem('storageUnitCount') ?? 0)
let orbitalExocraftMaterializerCount = parseInt(localStorage.getItem('orbitalExocraftMaterializerCount') ?? 0);
let currentFloor = parseInt(localStorage.getItem('currentFloor') ?? 0);
let currentType = EMPTY;
let currentRotation = 0;
const tilePreview = new Tile();

const handleRoomButton = e => {
  const type = e.getAttribute('data-type');

  currentType = type;

  // reset the rotation when choosing a new floor type
  currentRotation = 0

  // updateTilePreview();
};

const handleCWRotate = () => {
  const newRotation = currentRotation + 90;

  if(newRotation >= 360) {
    currentRotation = 0;
  } else {
    currentRotation = newRotation;
  }

  // updateTilePreview();
};

const handleCCWRotate = () => {
  const newRotation = currentRotation - 90;

  if(newRotation < 0) {
    currentRotation = 270;
  } else {
    currentRotation = newRotation;
  }

  // updateTilePreview();
};

const handleDeleteTile = () => {
  currentType = EMPTY;
  currentRotation = 0;

  // updateTilePreview();
};

const handleSaveFloor = () => {
  localStorage.setItem(`floor_${currentFloor}`, JSON.stringify(grid));
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

const updateFloorLabel = () => {
  const floorLabel = document.getElementById('floorLabel');
  floorLabel.innerText = `Floor ${currentFloor + 1}`;
};

const updateFloorButtons = () => {
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
  tilePreview.updateTile(currentType, currentRotation);
};

const renderContent = () => {
  updateFloorButtons();
  updateFloorLabel();
  populateTableGrid();
}

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

    console.log(currentRotation);

    clickedTile.updateTile(currentType, currentRotation);
    clickedTile.draw();
  }
};

const initiate = () => {
  // setup canvas
  const canvas = document.getElementById('canvas');
  canvas.setAttribute('width', TILE_SIZE * MAX_COLUMN);
  canvas.setAttribute('height', TILE_SIZE * MAX_ROW);

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  // get saved grid
  grid = JSON.parse(localStorage.getItem(`floor_${currentFloor}`) ?? '[]')
    .map(row => row.map(tile => new Tile(tile.x, tile.y, tile.rotation, tile.type, tile.isFixed)));

  // if there are no saved floor
  if (!grid.length) {
    // if it's the first floor
    if (currentFloor === 0) {
      // build the default freighter layout
      grid = buildDefaultFreighter();
    }
    else {
      // create empty grid
      for(let x = 0; x < MAX_COLUMN; x++) {
        for(let y = 0; y < MAX_ROW; y++) {
          const newTile = new Tile(x, y, 0, EMPTY, false);
          grid[x][y] = newTile;
        }
      }
    }
  }

  draw();

  // draw tile preview
  // const tilePreviewElement = document.getElementById('tilePreview');
  // tilePreviewElement.appendChild(tilePreview.draw());

  // renderContent();
  // updateStorageUnitButton();
  // updateOrbitalExocraftMaterializerButton();
};

const draw = () => {
  // draw each tiles
  grid.forEach(tiles => {
    tiles.forEach(tile => {
      tile.draw();
    })
  })
};

document.addEventListener('DOMContentLoaded', initiate);