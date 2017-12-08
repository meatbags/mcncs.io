import Cell from './cell';

class Field {
  constructor(items, size) {
    // create a randomised grid

    this.object = new THREE.Group();
    this.cells = [];
    this.items = items;
    this.size = size;

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
  }

  update(delta) {
    for (let i=0; i<this.cells.length; i++) {
      this.cells[i].update(delta);
    }
  }
}

export default Field;
