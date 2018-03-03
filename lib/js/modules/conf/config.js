import '../glsl/depth.js';

const Config = {
  tween: {
    speed: 1.5,
    threshold: 0.05
  },
  material: {
    depth: new THREE.ShaderMaterial(THREE.DepthShader)
  }
};

export { Config };
