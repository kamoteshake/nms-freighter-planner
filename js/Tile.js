class Tile {
  constructor(x, y, rotation, type, isFixed) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.rotation = rotation ?? 0;
    this.type = type ?? EMPTY;
    this.isFixed = isFixed ?? false;

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

  updateTile(type, rotation) {
    // only update the tile if it's not fixed
    if (this.isFixed) return;

    this.type = type;
    this.rotation = rotation;
  }

  draw() {
    const tileContainer = document.getElementById(`tile_${this.x}_${this.y}`);
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