import { Logo } from './logo';
import { Field } from './field';

class Scene {
  constructor(width, height, isMobile) {
    // scene handler

    this.scene = new THREE.Scene();
    this.camera = new Camera(width, height, isMobile);
    this.logo = new Logo();
    this.field = new Field(12, 2.5);
    this.scene.add(this.field.object, this.logo.object);

    // fire it up

    this.logo.start();
    this.camera.start();
    this.field.start();
  }

  update(delta) {
    // update scene

    this.camera.update(delta);
    this.logo.update(delta, this.camera.angle);
    this.field.update(delta);
  }

  resize(width, height) {
    // resize scene

    this.camera.resize(this.width, this.height);
  }

  getScene() {
    // get scene object

    return this.scene;
  }
}

export { Scene };
