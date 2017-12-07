import Config from './config';

class Field {
  constructor(x, z) {
    this.object = new THREE.Group();
    const nodes = 20;

    for (let xi=0; xi<nodes; xi++) {
      for (let zi=0; zi<nodes; zi++) {
        if (Math.random() > 0.4) {
          const block = new THREE.Mesh(new THREE.BoxBufferGeometry(.5, 4, 2), Config.material.depth);
          const newX = (xi - nodes / 2 + x) * 2;
          const newZ = (zi - nodes / 2 + z) * 2;
          block.position.set(newX, -Math.random() * 1, newZ);
          block.rotation.x = Math.random() * Math.PI;
          block.rotation.z = Math.random() * Math.PI;
          block.rotation.y = Math.random() * Math.PI;
          this.object.add(block);
        }
      }
    }
  }

  update(delta) {

  }
}

export default Field;
