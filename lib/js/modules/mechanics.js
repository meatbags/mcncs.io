/**
  @author meatbags / https://github.com/meatbags
  **/

// shader
THREE.MechanicsShader = {
  uniforms: {
    'tDiffuse': {value: null},
    'time': {value: 0.}
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float time;

    float rand(vec2 seed) {
      return fract(sin(dot(seed.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);
      vec4 samp = texture2D(tDiffuse, vec2(vUv.x, vUv.y - 0.01));

      tex = (tex + samp) / 2.0;
      float t = max(0.0, sin(time));
      float noise = rand(vUv + time) * 0.1;
      float r = clamp(tex.r + noise, 0.0, 1.0);

      gl_FragColor = vec4(r, tex.b * t, tex.g, 0.);
    }
  `
};

// render pass
THREE.MechanicsPass = function() {
  THREE.Pass.call(this);

  this.shader = THREE.MechanicsShader;
  this.material = new THREE.ShaderMaterial(this.shader);
  this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new THREE.Scene();
  this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material);
  this.quad.frustumCulled = false;
  this.scene.add(this.quad);
};

THREE.MechanicsPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
  constructor: THREE.MechanicsPass,
  render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.shader.uniforms['tDiffuse'].value = readBuffer.texture;
    this.shader.uniforms['time'].value += delta;

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear);
    }
  }
});
