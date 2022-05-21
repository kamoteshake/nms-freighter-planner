class Tile {
  constructor(x, y, rotation, type, isFixed, isPreview) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.rotation = rotation ?? 0;
    this.type = type ?? EMPTY;
    this.isFixed = isFixed ?? false;
    this.isPreview = isPreview ?? false;

    this.element = document.createElement('div');
    this.element.classList.add('tile');
    this.element.setAttribute('data-x', this.x);
    this.element.setAttribute('data-y', this.y);
  }

  updateRotation (rotation) {
    this.rotation = rotation;
  }

  updateIsFixed(isFixed) {
    this.isFixed = isFixed;
  }

  updateTile(newType, newRotation) {
    // only update the tile if it's not fixed
    if (this.isFixed) return;

    // if the tile is not a preview, update the tiles count
    if (!this.isPreview) {
      const tilesCount = getTilesCount();
      const newTileCount = tilesCount?.[newType] ?? 0;
      const currentTileCount = tilesCount?.[this.type] ?? 0;

      // if the new type is different from the current type
      if (newType !== this.type) {
        if (newType !== EMPTY) {
          // if the new type is not empty, add 1 to the new type count
          tilesCount[newType] = newTileCount + 1;
        }
        if (this.type !== EMPTY) {
          // the current tyle is not empty, subtract 1 from the current tile count
          tilesCount[this.type] = currentTileCount - 1;
        }
      }
  
      // save new tiles count
      localStorage.setItem('tilesCount', JSON.stringify(tilesCount));
    }

    this.type = newType;
    this.rotation = newRotation;
  }

  draw() {
    const tileContainer = document.getElementById(
      this.isPreview ? 'tilePreview' : `tile_${this.x}_${this.y}`
    );
    // remove the previous child
    tileContainer.innerHTML = '';
    
    if(this.isFixed) {
      this.element.classList.add('--fixed');
    }
    else {
      this.element.classList.remove('--fixed');
    }

    // remove the old type class
    const typeClass = this.element.className.split(' ').find(c => c.startsWith('--type-'));
    this.element.classList.remove(typeClass);

    // add new type class
    this.element.classList.add(`--type-${this.type}`);

    // remove the old rotate class
    const rotateClass = this.element.className.split(' ').find(c => c.startsWith('--rotate'));
    this.element.classList.remove(rotateClass);

    // add new rotate class
    this.element.classList.add(`--rotate${this.rotation}`);

    tileContainer.appendChild(this.element);
  }
}