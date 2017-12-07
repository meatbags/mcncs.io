import Config from './config';

class Field {
  constructor(x, z) {
    this.object = new THREE.Group();
    const nodes = 10;

    for (let xi=0; xi<nodes; xi++) {
      for (let zi=0; zi<nodes; zi++) {
        if (Math.random() < 0.5) {
          const block = new THREE.Mesh(new THREE.TorusBufferGeometry(2, .5, 8, 4), Config.material.depth);
          const newX = (xi - nodes / 2 + x) * 4;
          const newZ = (zi - nodes / 2 + z) * 4;
          block.position.set(newX, 0, newZ);
          block.rotation.x = Math.PI / 2;
          this.object.add(block);
          if (Math.random() > .5 && !(newX == 0. && newZ == 0.)) {
            const pyramid = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 4, 2), Config.material.depth);
            pyramid.position.set(newX, 0, newZ);
            this.object.add(pyramid);
          }
        } else {
          const blockA = new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.5, 8, 4), Config.material.depth);
          const blockB = new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.5, 8, 4), Config.material.depth);
          const blockC = new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.5, 8, 4), Config.material.depth);
          const blockD = new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.5, 8, 4), Config.material.depth);
          const newX = (xi - nodes / 2 + x) * 4;
          const newZ = (zi - nodes / 2 + z) * 4;
          blockA.rotation.x = Math.PI / 2;
          blockB.rotation.x = Math.PI / 2;
          blockC.rotation.x = Math.PI / 2;
          blockD.rotation.x = Math.PI / 2;
          blockA.position.set(newX + 1, 0, newZ + 1);
          blockB.position.set(newX - 1, 0, newZ + 1);
          blockC.position.set(newX + 1, 0, newZ - 1);
          blockD.position.set(newX - 1, 0, newZ - 1);
          this.object.add(blockA, blockB, blockC, blockD);
          if (Math.random() > 0.5) {
            const pyramid = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 4, 2), Config.material.depth);
            pyramid.position.set(newX + 1, 0, newZ + 1);
            this.object.add(pyramid);
          }
        }
      }
    }

    this.object.rotation.x = Math.PI / 128;
  }

  update(delta) {

  }
}

export default Field;
