import { Config } from '../conf';
import { Cell } from './cell';

class Field {
  constructor(items, size) {
    // grid field

    this.active = false;
    this.timeout = 0;
    this.populateGrid(items, size);
    this.start();
  }

  populateGrid(items, size) {
    // create grid of cells

    this.cells = [];
    this.object = new THREE.Group();

    for (let x=0; x<items; x++) {
      for (let z=0; z<items; z++) {
        const cell = new Cell((x - items/2) * size, 0, (z - items/2) * size, size, size);
        this.cells.push(cell);
        this.object.add(cell.object);
      }
    }

    //this.object.rotation.x = Math.PI / 128;
  }

  start() {
    // activate cells, flag for animation

    for (let i=0, len=this.cells.length; i<len; ++i) {
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
        this.timeout = 0.75;
        this.triggerAnimation();
      }
    }

    for (let i=0; i<this.cells.length; i++) {
      this.cells[i].update(delta);
    }
  }

  triggerAnimation() {
    // trigger animation of random cell

    const index = Math.floor(Math.random() * this.cells.length);
    this.cells[index].trigger();
  }
}

export { Field };
