class Tile {
  constructor(x, y, type, rotation, isFixed) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.rotation = rotation ?? 0;
    this.type = type ?? EMPTY;
    this.isFixed = isFixed ?? false;
    this.element = document.createElement('div');
  }

  rotateCW() {
    const newRotation = this.rotation + 90;

    if(newRotation >= 360) {
      this.rotation = 0;
    } else {
      this.rotation = newRotation;
    }

    this.updateRotation();
  }

  rotateCCW() {
    const newRotation = this.rotation - 90;

    if(newRotation < 0) {
      this.rotation = 270;
    } else {
      this.rotation = newRotation;
    }

    this.updateRotation();
  }

  updateRotation () {
    const rotateClass = this.element.className.split(' ').find(c => c.startsWith('--rotate'));

    this.element.classList.remove(rotateClass);
    this.element.classList.add(`--rotate${this.rotation}`);
  }

  updateTile(type, rotation, isFixed = false) {
    if (type === this.type && rotation === this.rotation && isFixed === this.isFixed) return;

    // remove previous info
    this.element.classList.remove(`--fixed`);

    this.type = type;
    this.isFixed = isFixed;

    // add new info
    if(this.isFixed) {
      this.element.classList.add('--fixed');
    }

    if(rotation !== undefined) {
      this.rotation = rotation;
      this.updateRotation();
    }

    this.reDrawType();
  }

  reDrawType() {
    // remove any child
    if (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    if(this.type !== EMPTY) {
      // create new image
      const imageElement = document.createElement('img');
      imageElement.src = typeImages[this.type];
      this.element.appendChild(imageElement);
    }
  }

  draw() {
    this.element.classList.add('tile');

    this.element.setAttribute('data-x', this.x);
    this.element.setAttribute('data-y', this.y);

    if(this.isFixed) {
      this.element.classList.add('--fixed');
    }

    if(this.type !== EMPTY) {
      const imageElement = document.createElement('img');
      imageElement.src = typeImages[this.type];
      this.element.appendChild(imageElement);
      this.updateRotation();
    }

    return this.element;
  }
}