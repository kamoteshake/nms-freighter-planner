let grid = [];
let storageUnitCount = parseInt(localStorage.getItem('storageUnitCount') ?? 0)
let orbitalExocraftMaterializerCount = parseInt(localStorage.getItem('orbitalExocraftMaterializerCount') ?? 0);
let currentFloor = parseInt(localStorage.getItem('currentFloor') ?? 0);
let currentType = EMPTY;
let currentRotation = 0;
const tilePreview = new Tile(0, 0, currentRotation, currentType);

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
    .map(row => row.map(tile => new Tile(tile.x, tile.y, tile.rotation, tile.type, tile.isFixed)));

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

const initiate = () => {
  // build empty grid
  const gridTable = document.getElementById('gridTable');
  const tableBody = document.createElement('tbody');

  tableBody.addEventListener('mousedown', handleTableClick);
  tableBody.addEventListener('mouseover', handleTableClick);


  // create row
  for(let row = 0; row < MAX_ROW; row++) {
    const tableRow = document.createElement('tr');

    // create column
    for(let column = 0; column < MAX_COLUMN; column++) {
      const tableColumn = document.createElement('td');
      tableColumn.id = `tile_${row}_${column}`;

      tableRow.appendChild(tableColumn);
    }

    tableBody.appendChild(tableRow);
  }

  gridTable.appendChild(tableBody);

  // draw tile preview
  const tilePreviewElement = document.getElementById('tilePreview');
  tilePreviewElement.appendChild(tilePreview.draw());

  renderContent();
  updateStorageUnitButton();
  updateOrbitalExocraftMaterializerButton();
};

document.addEventListener('DOMContentLoaded', initiate);