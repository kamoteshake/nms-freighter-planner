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
      // get the current tiles count
      const tilesCount = getTilesCount();
  
      // add to count if the new tile is not empty and not the same as the current tile
      if (newType !== EMPTY && newType !== this.type) {
        // check if the new tile exists in the tilesCount
        if (tilesCount[newType] === undefined) {
          tilesCount[newType] = 0;
        }

        tilesCount[newType] += 1;
      }
  
      // subtract from count if the current tile is not empty and not the same as the new tile
      if (this.type !== EMPTY && newType !== this.type) {
        // check if the current tile exists in the tilesCount
        if (tilesCount[this.type] === undefined) {
          tilesCount[this.type] = 0;
        }

        tilesCount[this.type] -= 1;
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