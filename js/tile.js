class Tile {
  constructor(x, y, rotation, type, isFixed) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.rotation = rotation ?? 0;
    this.isFixed = isFixed ?? false;
    this.type = type ?? EMPTY;
    this.img = typeImages[type];
    this.hovered = false;
  }

  mouseEnter() {
    this.hovered = true;
  }

  mouseExit() {
    this.hovered = false;
  }

  updateRotation(rotation) {
    this.rotation = rotation;
  }

  updateIsFixed(isFixed) {
    this.isFixed = isFixed;
  }

  updateTile(type, rotation) {
    // only update the tile if it's not fixed
    if (this.isFixed) return;

    this.type = type;
    this.img = typeImages[type];
    this.rotation = rotation;
  }

  draw() {
    const ctx = document.getElementById('canvas').getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.save();
      const translateX = (this.x * TILE_SIZE) + TILE_SIZE * 0.5;
      const translateY = (this.y * TILE_SIZE) + TILE_SIZE * 0.5;

      ctx.translate(translateX, translateY);
      ctx.rotate((Math.PI / 180) * this.rotation);
      ctx.drawImage(img, -(TILE_SIZE * 0.5), -(TILE_SIZE * 0.5));
      ctx.restore();

      // add a green border when hovered and it's not a fixed tile
      if (this.hovered && !this.isFixed) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#0F0';
        ctx.strokeRect(this.x * TILE_SIZE + 1, this.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      }

      //add red border if it is a fixed tiled
      if(this.isFixed) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#F00';
        ctx.strokeRect(this.x * TILE_SIZE + 1, this.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      }
    };
    img.src = this.img;
  }
}