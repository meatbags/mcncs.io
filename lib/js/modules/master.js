import '../lib';
import './mechanics.js';
import './noise.js';
import Logo from './logo';
import Field from './field';
import Camera from './camera';
import Config from './config';

class Master {
  init() {
    // check for mobiles
    this.isMobile = window.mobilecheck();

    // set up context
    this.width = (this.mode == 'dev') ? 800 : window.innerWidth;
    this.height = (this.mode == 'dev') ? 600 : window.innerHeight;
    this.size = new THREE.Vector2(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x0, 1);
    document.getElementById('canvas-wrapper').appendChild(this.renderer.domElement);

    // scene
    this.createScene();

    // camera
    this.camera = new Camera(this.width, this.height, this.isMobile);

    // events
    $(window).on('resize', () => { this.onResize(); });

    // time
    this.time = (new Date()).getTime();
    this.age = 0;

    // post-processing
    this.initPostProcessing();

    // run
    this.paused = false;
    this.ready = true;
    this.beforeLoop();
    this.loop();
  }

  createScene() {
    this.scene = new THREE.Scene();

    // objects
    this.logo = new Logo();
    this.field = new Field(12, 2.5);

    // add to scene
    this.scene.add(this.field.object);
    this.scene.add(this.logo.object);
  }

  initPostProcessing() {
    // post-processing passes
    this.renderPass = new THREE.RenderPass(this.scene, this.camera.camera);
    this.mechanicsPass = new THREE.MechanicsPass(this.size);
    //this.mechanicsPass.renderToScreen = true;
    this.bloomPass = new THREE.UnrealBloomPass(this.size, 0.7, 1., 0.7); // res, strength, radius, threshold
    //this.bloomPass.renderToScreen = true;
    this.FXAAPass = new THREE.ShaderPass(THREE.FXAAShader);
    this.noisePass = new THREE.NoisePass();
    this.noisePass.renderToScreen = true;

    // composer
    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.mechanicsPass);
    this.composer.addPass(this.FXAAPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.noisePass);

    // gamma
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }

  onMenu() {
    this.logo.hide();
    this.camera.zoomOut();
  }

  onMenuClose() {
    this.logo.show();
    this.camera.zoomIn();
  }

  onFocus() {
    this.time = (new Date()).getTime();
    this.paused = false;
    this.loop();
  }

  onBlur() {
    this.paused = true;
  }

  onResize() {
    if (!this.isMobile || this.width != window.innerWidth) {
      this.width = (this.mode == 'dev') ? 800 : window.innerWidth;
      this.height = (this.mode == 'dev') ? 600 : window.innerHeight;
      this.size.x = this.width;
      this.size.y = this.height;
      this.camera.resize(this.width, this.height);

      // update renderer & passes
      this.renderer.setSize(this.width, this.height);
      this.bloomPass.setSize(this.width, this.height);
      this.mechanicsPass.setSize(this.width, this.height);
      this.composer.setSize(this.width, this.height);
    }
  }

  update(delta) {
    this.camera.update(delta);
    this.logo.update(delta, this.camera.angle);
    this.field.update(delta);
  }

  render(delta) {
    this.composer.render(delta);
  }

  beforeLoop() {
    // pre loop actions

    // animate 3d logo
    this.logo.start();

    // animate camera
    this.camera.start();

    // raise grid
    this.field.start();
  }

  loop() {
    if (!this.paused) {
      const reloop = () => {this.loop();};
      const fps = 1000 / 20;

      setTimeout(() => {
        requestAnimationFrame(reloop);
      }, fps);

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
}

export default Master;
