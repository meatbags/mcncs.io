/**
  @author meatbags / https://github.com/meatbags
  **/

THREE.DepthShader = {
  uniforms: {},
  vertexShader: `
    varying vec4 vModel;
    varying vec3 vNormal;

    void main() {
      vNormal = normal;
      vModel = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `,
  fragmentShader: `
    varying vec4 vModel;
    varying vec3 vNormal;

    void main() {
      if (vModel.y <= 0.) {
        gl_FragColor = vec4(0., 0., 0., 1.);
      } else {
        float t = (vModel.y >= 0.0) ? vModel.y / 4.0 : 0.0;
        float d = (t <= 1.) ? t : max(1.0 - 0.75 * (t - 1.0), 0.0);

        gl_FragColor = vec4(d, d, d, 1.0);
      }
    }
  `
};
