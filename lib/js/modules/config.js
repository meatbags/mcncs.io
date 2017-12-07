import './depth.js';

const Config = {
  tween: {
    speed: 1.5,
    threshold: 0.05
  },
  material: {
    depth: new THREE.ShaderMaterial(THREE.DepthShader)
  }
};

//Config.material.depth.transparent = true;
//Config.material.depth.material.blending = THREE.AdditiveBlending;
//Config.material.depth.material.side = THREE.DoubleSide;

export default Config;
