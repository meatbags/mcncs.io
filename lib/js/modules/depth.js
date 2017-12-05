/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.DepthShader = {
  uniforms: {},
  vertexShader: `
    varying vec4 vWorld;
    varying vec4 vTransformed;

    void main() {
      vWorld = vec4(position, 1.0);
      vTransformed = modelViewMatrix * vWorld;
      gl_Position = projectionMatrix * vTransformed;
    }
  `,
  fragmentShader: `
    varying vec4 vWorld;
    varying vec4 vTransformed;

    void main() {
      float d = (vWorld.y > 0.0)
        ? clamp(1.0 - vWorld.y / 2.0, 0.0, 1.0)
        : 0.0;

      gl_FragColor = vec4(d, d, d, 1.0);
    }
  `
};
