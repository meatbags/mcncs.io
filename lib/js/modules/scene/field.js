import { Cell } from '../cell';

class Field {
  constructor(items, size) {
    // grid field

    this.createGrid(items, size);
    this.active = false;
    this.timeout = 0;
  }

  populateGrid() {
    // create grid of cells

    this.cells = [];
    this.object = new THREE.Group();

    for (let x=0; x<items; x++) {
      for (let z=0; z<items; z++) {
        const cell = new Cell((x - items/2) * size, (z - items/2) * size, size, size);
        this.cells.push(cell);
        this.object.add(cell.object);
      }
    }

    this.object.rotation.x = Math.PI / 128;
  }

  start() {
    // activate cells, flag for animation

    for (let i=0; i<this.cells.length; i++) {
      this.cells[i].start(Math.floor(Math.random() * 7500));
    }

    setTimeout(() => {
      this.active = true;
    }, 3500);
  }

  update(delta) {
    // trigger an animation

    if (this.active) {
      this.timeout -= delta;

      if (this.timeout < 0) {
        this.timeout = 1.2;
        this._triggerAnimation();
      }
    }

    for (let i=0; i<this.cells.length; i++) {
      this.cells[i].update(delta);
    }
  }

  _triggerAnimation() {
    // trigger animation of random cell

    const index = Math.floor(Math.random() * this.cells.length);
    this.cells[index].trigger();
  }
}

export { Field };
