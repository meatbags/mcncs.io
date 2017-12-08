import Config from './config';
import Tween from './tween';

class Cell {
  constructor(x, z, width, height) {
    // props
    this.x = x;
    this.z = z;
    this.width = width;
    this.height =  height;

    // object
    this.object = new THREE.Group();
    this._build();

    // animation
    this.object.position.set(x, -1, z);
    this.tween = new Tween(this.object, 0.5);
    const y = (Math.random() > 0.5) ? 0 : 0;
    this.tween.setActiveState(
      new THREE.Vector3(x, y, z)
    );
  }

  start(ms) {
    // activate cell after timeout

    setTimeout(() => {
      this.tween.activate();
    }, ms);
  }

  update(delta) {
    this.tween.update(delta);
  }

  _build() {
    // create object
    const r = Math.random();

    if (r < 0.5) {
      this._largeCell();
    } else if (r < 0.8) {
      this._smallCell();
    } else {
      this._blocks();
    }
  }

  _largeCell() {
    // create large cell item
    const r = this.width / 2;
    const ri = this.width / 10;

    const block = new THREE.Mesh(new THREE.TorusBufferGeometry(r, ri, 8, 4), Config.material.depth);
    block.rotation.x = Math.PI / 2;
    this.object.add(block);

    if (Math.random() > .5 && !(this.x == 0. && this.z == 0.)) {
      const inner = new THREE.Mesh(new THREE.TorusBufferGeometry(r / 2, ri, 8, 4), Config.material.depth);
      inner.rotation.x = Math.PI / 2;
      this.object.add(inner);
    } else if (Math.random() > 0.8) {
      this._blocks();
    }
  }

  _blocks() {
    const r = this.width / 10;
    const cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(r, r, this.width, 8), Config.material.depth);
    cylinder.rotation.x = Math.PI / 2;
    this.object.add(cylinder);

    if (Math.random() > 0.4) {
      const cylinder2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(r, r, this.width, 8), Config.material.depth);
      cylinder2.rotation.set(Math.PI / 2, 0, Math.PI / 2);
      this.object.add(cylinder2);
    }
  }

  _smallCell() {
    const w = this.width / 4;
    const wi = this.width / 10;
    const blockA = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
    const blockB = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
    const blockC = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
    const blockD = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);

    blockA.rotation.set(Math.PI / 2, 0, 0);
    blockB.rotation.set(Math.PI / 2, 0, 0);
    blockC.rotation.set(Math.PI / 2, 0, 0)
    blockD.rotation.set(Math.PI / 2, 0, 0);
    blockA.position.set(+1, 0, +1);
    blockB.position.set(-1, 0, +1);
    blockC.position.set(+1, 0, -1);
    blockD.position.set(-1, 0, -1);
    this.object.add(blockA, blockB, blockC, blockD);

    if (Math.random() > 0.5) {
    }
  }
}

export default Cell;
