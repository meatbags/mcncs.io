import Cell from './cell';

class Field {
  constructor(items, size) {
    // create a randomised grid

    this.object = new THREE.Group();
    this.cells = [];
    this.items = items;
    this.size = size;
    this.active = false;
    this.timeout = 0;

    for (let x=0; x<items; x++) {
      for (let z=0; z<items; z++) {
        const cell = new Cell((x - items/2) * size, (z - items/2) * size, size, size);
        this.cells.push(cell);
        this.object.add(cell.object);
      }
    }

    // set position
    this.object.rotation.x = Math.PI / 128;
  }

  start() {
    // activate cells

    for (let i=0; i<this.cells.length; i++) {
      this.cells[i].start(3500 + Math.floor(Math.random() * 10000));
    }

    // flag for animation
    setTimeout(() => { this.active = true; }, 12000);
  }

  update(delta) {
    // trigger an animation every 5s
    if (this.active) {
      this.timeout -= delta;

      if (this.timeout < 0) {
        this.timeout = 4;
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

export default Field;
