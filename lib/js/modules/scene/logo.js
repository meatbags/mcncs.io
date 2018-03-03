import { Tween } from '../utils';
import { Config } from './config';

class Logo {
  constructor(scene) {
    this.object = new THREE.Group();
    this.active = true;

    // objects
    this.components = {
      columnA: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 4, 1), Config.material.depth),
      columnB: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 4, 1), Config.material.depth),
      columnC: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 4, 1), Config.material.depth),
      joinAB: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), Config.material.depth),
      joinBC: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), Config.material.depth),
    };

    // set position
    this.components.columnA.position.set(0, -2, 2);
    this.components.columnB.position.set(0, -2, 0);
    this.components.columnC.position.set(0, -2, -2);
    this.components.joinAB.position.set(0, -2, 1);
    this.components.joinBC.position.set(0, -2, -1);

    // set animation
    this.tweens = {
      columnA: new Tween(this.components.columnA),
      columnB: new Tween(this.components.columnB),
      columnC: new Tween(this.components.columnC),
      joinAB: new Tween(this.components.joinAB),
      joinBC: new Tween(this.components.joinBC),
    };

    this.tweens.columnA.setActiveState(new THREE.Vector3(0, 1, 2));
    this.tweens.columnB.setActiveState(new THREE.Vector3(0, 1, 0));
    this.tweens.columnC.setActiveState(new THREE.Vector3(0, 1, -2));
    this.tweens.joinAB.setActiveState(new THREE.Vector3(0, 2.5, 1));
    this.tweens.joinBC.setActiveState(new THREE.Vector3(0, 2.5, -1));

    this.object.add(
      this.components.columnA,
      this.components.columnB,
      this.components.columnC,
      this.components.joinAB,
      this.components.joinBC,
    );
  }

  hide() {
    // cascade hide

    this.tweens.columnC.deactivate();
    this.tweens.joinBC.deactivate(200);
    this.tweens.columnB.deactivate(400);
    this.tweens.joinAB.deactivate(600);
    this.tweens.columnA.deactivate(800);
  }

  show() {
    // cascade show

    this.tweens.columnC.activate();
    this.tweens.joinBC.activate(200);
    this.tweens.columnB.activate(400);
    this.tweens.joinAB.activate(600);
    this.tweens.columnA.activate(800);
  }

  start() {
    // initial show animation

    this.tweens.columnA.activate();
    this.tweens.columnB.activate();
    this.tweens.columnC.activate();
    this.tweens.joinAB.activate(500);
    this.tweens.joinBC.activate(500);
  }

  update(delta, angle) {
    this.object.rotation.y = -angle;

    if (this.active) {
      this.tweens.columnA.update(delta);
      this.tweens.columnB.update(delta);
      this.tweens.columnC.update(delta);
      this.tweens.joinAB.update(delta);
      this.tweens.joinBC.update(delta);
    }
  }
}

export { Logo };
