class EmptyRoom extends Tile {
  constructor(x, y, rotation, isFixed) {
    super(x, y, rotation, isFixed);

    this.type = EMPTY;
    this.img = 'img/emptyRoom.png';
  }

  draw() {
    const ctx = document.getElementById('canvas').getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.rotate((Math.PI / 180) * this.rotation);
      ctx.drawImage(img, this.x * TILE_SIZE, this.y * TILE_SIZE);

      this.render();
    };
    img.src = this.img;
  }
}