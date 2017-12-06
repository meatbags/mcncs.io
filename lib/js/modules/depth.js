/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.DepthShader = {
  uniforms: {},
  vertexShader: `
    varying vec4 vModel;

    void main() {
      vModel = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec4 vModel;

    void main() {
      float t = (vModel.y >= 0.0) ? 1.0 - clamp(vModel.y / 10., 0.0, 1.0) : 0.0;
      float d = t * t;

      gl_FragColor = vec4(d, d, d, 1.0);
    }
  `
};
