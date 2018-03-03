import { Camera } from './camera';
import { Logo } from './logo';
import { Field } from './field';

class Scene {
  constructor(width, height, isMobile) {
    // scene handler

    this.width = width;
    this.height = height;
    this.scene = new THREE.Scene();
    this.camera = new Camera(width, height, isMobile);
    this.logo = new Logo();
    this.field = new Field(12, 2.25);
    this.scene.add(this.field.object);
    //this.scene.add(this.logo.object);
  }

  update(delta) {
    // update scene

    this.camera.update(delta);
    //this.logo.update(delta, this.camera.angle);
    this.field.update(delta);
  }

  resize(width, height) {
    // resize scene

    this.camera.resize(this.width, this.height);
  }

  getCamera() {
    return this.camera.getCamera();
  }

  getScene() {
    return this.scene;
  }
}

export { Scene };
