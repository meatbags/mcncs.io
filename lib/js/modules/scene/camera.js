import { minAngleBetween } from './maths';
import { TweenSingle } from '../scene';

class Camera {
  constructor(width, height, isMobile) {
    this.width = width;
    this.height = height;

    // set up
    this.scaleFactor = (isMobile) ? 100 : 150;
    this.scale = 1 / this.scaleFactor;
    this.camera = new THREE.OrthographicCamera(width * -this.scale, width * this.scale, height * this.scale, height * -this.scale, 1, 1000);
    this.camera.updateProjectionMatrix();
    this.angle = 0;
    this.distance = 20;
    this.camera.position.set(this.distance, this.distance, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // animation
    this.tween = new TweenSingle(this, 'scaleFactor', 1);
    this.tween.setActiveState((isMobile) ? 90 : 120);
  }

  start() {}

  zoomOut() {
    this.tween.activate();
  }

  zoomIn() {
    this.tween.deactivate();
  }

  update(delta) {
    this.tween.update(delta);

    // resize camera if zoomed
    if (this.tween.changed) {
      this.scale = 1 / this.scaleFactor;
      this._resizeCamera();
    }

    // rotate
    this.angle += delta * 0.05;
    this.camera.position.set(Math.cos(this.angle) * this.distance, this.distance, Math.sin(this.angle) * this.distance);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this._resizeCamera();
  }

  _resizeCamera() {
    this.camera.left = this.width * -this.scale;
    this.camera.right = this.width * this.scale;
    this.camera.top = this.height * this.scale;
    this.camera.bottom = this.height * -this.scale;
    this.camera.updateProjectionMatrix();
  }
}

export { Camera };
