import { minAngleBetween } from './maths';

class Camera {
  constructor(width, height) {
    this.scale = 150;
    this.camera = new THREE.OrthographicCamera(width/-this.scale, width/this.scale, height/this.scale, height/-this.scale, 1, 1000);
    this.camera.updateProjectionMatrix();
    this.angle = 0;
    this.target = {angle: 0};
    this.distance = 20;
    this.camera.position.set(20, 20, 20);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  start() {}

  update(delta) {
    this.angle += delta * 0.05;
    this.camera.position.set(Math.cos(this.angle) * this.distance, 20, Math.sin(this.angle) * this.distance);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  resize(width, height) {
    this.camera.left = width / -this.scale;
    this.camera.right = width / this.scale;
    this.camera.top = height / this.scale;
    this.camera.bottom = height / -this.scale;
    this.camera.updateProjectionMatrix();
  }
}

export default Camera;
