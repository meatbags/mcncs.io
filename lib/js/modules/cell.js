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
    this.state = 0;
    this.object.position.set(x, -1, z);
    this.tween = new Tween(this.object, 0.5);
    this.tween.setActiveState(
      new THREE.Vector3(x, 0.125, z)
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

    if (this.state != 0) {
      if (this.tween.complete) {
        this._nextState();
      }
    }
  }

  trigger() {
    // do a random animation

    if (this.state == 0) {
      const r = Math.random();

      if (r < 0.55) {
        this._animationA();
      } else {
        this._animationB();
      }

      this._nextState();
    }
  }

  _nextState() {
    // progress animated states

    this.state += 1;
    if (this.state > 3) {
      this.state = 0;
    } else {
      const index = this.state - 1;
      this.tween.deactivate();
      this.tween.setActiveState(this.animations[index][0], this.animations[index][1]);
      this.tween.activate();
    }
  }

  _animationA() {
    // custom animation - up, rotate 90, down

    const p = this.tween.state.active.position;
    const r = this.tween.state.active.rotation;
    const d = (Math.random() > 0.5) ? Math.PI / 2 : -Math.PI / 2;
    let y = (Math.random() > 0.5) ? 0.5 : -0.5;

    if (y > 0 && Math.random() > 0.5) {
      y *= 5;
    }

    this.animations = [];
    this.animations.push(
      [new THREE.Vector3(p.x, p.y + y, p.z), new THREE.Vector3(r.x, r.y, r.z)],
      [new THREE.Vector3(p.x, p.y + y, p.z), new THREE.Vector3(r.x, r.y + d, r.z)],
      [new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(r.x, r.y + d, r.z)]
    );
  }

  _animationB() {
    // custom animation - rotate, rotate, replace

    const p = this.tween.state.active.position;
    const r = this.tween.state.active.rotation;
    const d = (Math.random() > 0.5) ? Math.PI / 2 : -Math.PI / 2;

    this.animations = [];
    this.animations.push(
      [new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(r.x + d, r.y, r.z)],
      [new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(r.x + d, r.y + d, r.z)],
      [new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(r.x, r.y + d, r.z)]
    );
  }

  _build() {
    // create object
    const r = Math.random();

    if (r < 0.55) {
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
      inner.rotation.z = Math.PI / 2;
      this.object.add(inner);
    }

    if (Math.random() > 0.85) {
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

    if (Math.random() < 0.85) {
      const off = this.width / 4;
      const blockA = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
      const blockB = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
      const blockC = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
      const blockD = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);

      blockA.rotation.set(Math.PI / 2, 0, 0);
      blockB.rotation.set(Math.PI / 2, 0, 0);
      blockC.rotation.set(Math.PI / 2, 0, 0)
      blockD.rotation.set(Math.PI / 2, 0, 0);
      blockA.position.set(off, 0, off);
      blockB.position.set(-off, 0, off);
      blockC.position.set(off, 0, -off);
      blockD.position.set(-off, 0, -off);
      this.object.add(blockA, blockB, blockC, blockD);
    } else {
      const blockA = new THREE.Mesh(new THREE.TorusBufferGeometry(w, wi, 8, 4), Config.material.depth);
      blockA.rotation.set(Math.PI / 2, 0, 0);
      this.object.add(blockA);
      this._blocks();
    }
  }
}

export default Cell;
