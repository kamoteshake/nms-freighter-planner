class Tile {
  constructor(x, y, rotation, isFixed) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.rotation = rotation ?? 0;
    this.isFixed = isFixed ?? false;
    this.hovered = false;
  }

  mouseEnter() {
    this.hovered = true;
  }

  mouseExit() {
    this.hovered = false;
  }

  rotateCW() {
    const newRotation = this.rotation + 90;

    if(newRotation >= 360) {
      this.rotation = 0;
    } else {
      this.rotation = newRotation;
    }
  }

  rotateCCW() {
    const newRotation = this.rotation - 90;

    if(newRotation < 0) {
      this.rotation = 270;
    } else {
      this.rotation = newRotation;
    }
  }

  render() {
    const ctx = document.getElementById('canvas').getContext('2d');

    if (this.hovered) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#0F0';
      ctx.strokeRect(this.x * TILE_SIZE + 1, this.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
    }
  }
}