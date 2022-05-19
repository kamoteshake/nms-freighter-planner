// config
const TILE_SIZE = 50;
const MAX_ROW = 21;
const MAX_COLUMN = 21;
const MAX_FLOOR = 14;
const MAX_STORAGE_UNIT = 10;
const MAX_ORBITAL_EXOCRAFT_MATERIALIZER = 1;

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

  updateTilePreview();
};

const handleCWRotate = () => {
  const newRotation = currentRotation + 90;

  if(newRotation >= 360) {
    currentRotation = 0;
  } else {
    currentRotation = newRotation;
  }

  updateTilePreview();
};

const handleCCWRotate = () => {
  const newRotation = currentRotation - 90;

  if(newRotation < 0) {
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

const populateTableGrid = () => {
  // get saved grid
  const serializedGrid = JSON.parse(localStorage.getItem(`floor_${currentFloor}`) ?? '[]')
    .map(row => row.map(tile => new Tile(tile.x, tile.y, tile.type, tile.rotation, tile.isFixed)));

  grid = serializedGrid;

  // create new empty grid if there are no grid
  if (!grid.length) {
    for(let row = 0; row < MAX_ROW; row++) {
      const rowArray = [];
  
      // create column
      for(let column = 0; column < MAX_COLUMN; column++) {
        const newTile = new Tile(row, column);
        rowArray.push(newTile);
  
        const tableColumn = document.getElementById(`tile_${row}_${column}`);
        tableColumn.innerHTML = '';
        tableColumn.appendChild(newTile.draw());
      }
  
      grid.push(rowArray);
    }
  } else {
    grid.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        const tableColumn = document.getElementById(`tile_${rowIndex}_${tileIndex}`);
        tableColumn.innerHTML = '';
        tableColumn.appendChild(tile.draw());
      });
    });
  }

  // if it's the first floor and there is no saves for the first floor,
  // render the default freighter floor
  if (currentFloor === 0 && !localStorage.getItem('floor_0')) {
    buildDefaultFreighter(grid);
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

const mouseEvent = (e) => {
  const rect = e.target.getBoundingClientRect();

  let x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
  let y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x >= MAX_COLUMN) x = MAX_COLUMN - 1;
  if (y >= MAX_ROW) y = MAX_ROW - 1;

  if (lastHovered.x === x && lastHovered.y === y) return;

  if (lastHovered.x !== null && lastHovered.y !== null) {
    const lastHoveredTile = grid[lastHovered.x][lastHovered.y];
    lastHoveredTile.mouseExit();
    lastHoveredTile.draw();
  }

  const hoveredTile = grid[x][y];
  hoveredTile.mouseEnter();
  hoveredTile.draw();

  lastHovered = { x, y };
};

const initiate = () => {
  // setup canvas
  const canvas = document.getElementById('canvas');
  canvas.setAttribute('width', TILE_SIZE * MAX_COLUMN);
  canvas.setAttribute('height', TILE_SIZE * MAX_ROW);

  canvas.addEventListener('mousemove', mouseEvent);

  // create empty grid
  for(let x = 0; x < MAX_COLUMN; x++) {
    for(let y = 0; y < MAX_ROW; y++) {
      const newTile = new EmptyRoom(x, y, 0, false);
      grid[x][y] = newTile;
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