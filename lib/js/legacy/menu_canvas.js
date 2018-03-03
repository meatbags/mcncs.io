class MenuCanvas {
  constructor() {
    const $cvs = $('<canvas></canvas>', {id: 'menucvs'});
    $('.menu__content__canvas').append($cvs);
    this.cvs = $cvs[0];
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = 340;
    this.cvs.height = 250;
    this.size = 15; // horizontal items
    this.step = this.cvs.width / this.size;
    this._createGrid();
  }

  draw() {
    this.ctx.strokeStyle = '#fff';

    for (let i=0; i<this.grid.length; i++) {
      if (Math.random() > 0.75) {
        this.ctx.strokeStyle = this.ctx.fillStyle = '#f00';
      } else {
        this.ctx.strokeStyle = this.ctx.fillStyle = '#fff';
      }

      const cell = this.grid[i];

      if (cell.type == 0) {
        this.ctx.strokeRect(cell.x - 1, cell.y - 1, 2, 2);
      } else if (cell.type == 1) {
        this.ctx.beginPath();
        this.ctx.moveTo(cell.x - 4, cell.y - 4);
        this.ctx.lineTo(cell.x + 4, cell.y + 4);
        this.ctx.stroke();
      } else if (cell.type == 2) {
        this.ctx.beginPath();
        this.ctx.moveTo(cell.x - 4, cell.y - 4);
        this.ctx.lineTo(cell.x + 4, cell.y + 4);
        this.ctx.moveTo(cell.x + 4, cell.y - 4);
        this.ctx.lineTo(cell.x - 4, cell.y + 4);
        this.ctx.stroke();
      } else if (cell.type == 3) {
        this.ctx.beginPath();
        this.ctx.arc(cell.x, cell.y, 4, 0, Math.PI*2);
        this.ctx.stroke();
      }
    }
  }

  _createGrid() {
    this.grid = [];
    const baseX = this.cvs.width / 5 + this.cvs.width / 10;
    const baseY = this.cvs.height / 2;
    const pad = this.cvs.width / 10;
    const zones = [
      [baseX - pad, baseX + pad],
      [this.cvs.width - baseX - pad, this.cvs.width - baseX + pad]
    ];

    for (let x=0; x<this.cvs.width; x+=this.step) {
      for (let y=0; y<this.cvs.width; y+=this.step) {
        const cX = x + this.step/2;
        const cY = y + this.step/2;
        if (
          !(cY > baseY && cX >= zones[0][0] && cX <= zones[0][1]) &&
          !(cY > baseY && cX >= zones[1][0] && cX <= zones[1][1])
        ) {
          this.grid.push(this._cell(cX, cY));
        }
      }
    }
  }

  _cell(x, y) {
    const cell = {x: x, y: y};
    cell.type = Math.floor(Math.random() * 4);

    return cell;
  }
}

export default MenuCanvas;
