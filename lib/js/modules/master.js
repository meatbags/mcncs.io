import '../post/EffectComposer.js';
import '../post/ShaderPass.js';
import '../post/RenderPass.js';
import '../post/CopyShader.js';
import '../post/LuminosityHighPassShader.js';
import '../post/UnrealBloomPass.js';
import './mechanics.js';
import './depth.js';

class Master {
  init() {
    // set up context
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.size = new THREE.Vector2(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0, 1);
    document.getElementById('canvas-wrapper').appendChild(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();
    this.material = new THREE.ShaderMaterial(THREE.DepthShader);
    this.material.transparent = true;
    this.material.blending = THREE.AdditiveBlending;
    this.sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(2, 4, 2),
      this.material
    );
    this.scene.add(this.sphere);

    // camera
    this.scale = 200;
    this.camera = new THREE.OrthographicCamera(this.width/-this.scale, this.width/this.scale, this.height/this.scale, this.height/-this.scale, 1, 1000);
    this.camera.updateProjectionMatrix();
    //this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    //this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // events
    $(window).on('resize', () => { this.onResize(); });

    // time
    this.time = (new Date()).getTime();
    this.age = 0;

    // post-processing
    this.initPost();

    // run
    this.ready = true;
    this.loop();
  }

  initPost() {
    // post-processing passes
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.mechanicsPass = new THREE.MechanicsPass();
    this.mechanicsPass.renderToScreen = true;
    this.bloomPass = new THREE.UnrealBloomPass(this.size, 0.5, 1.0, 0.75); // res, strength, radius, threshold
    //this.bloomPass.renderToScreen = true;

    // composer
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.mechanicsPass);

    // gamma
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.size.x = this.width;
    this.size.y = this.height;
    //this.camera.aspect = this.width / this.height;
    this.camera.left = this.width / -this.scale;
    this.camera.right = this.width / this.scale;
    this.camera.top = this.height / this.scale;
    this.camera.bottom = this.height / -this.scale;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  update(delta) {
    this.sphere.rotation.y += delta * 0.5 * Math.random();
    this.sphere.position.y = Math.sin(this.age);
  }

  render(delta) {
    this.composer.render(delta);
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); })

    // time
    const now = (new Date()).getTime();
    const delta = (now - this.time) / 1000.;
    this.time = now;
    this.age += delta;

    if (this.ready) {
      this.update(delta);
      this.render(delta);
    }
  }
}

export default Master;
