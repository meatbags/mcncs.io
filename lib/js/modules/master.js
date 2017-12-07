import '../post/EffectComposer.js';
import '../post/ShaderPass.js';
import '../post/RenderPass.js';
import '../post/CopyShader.js';
import '../post/LuminosityHighPassShader.js';
import '../post/UnrealBloomPass.js';
import '../post/FXAA.js';
import './mechanics.js';
import './noise.js';

import Logo from './logo';

class Master {
  init() {
    // set up context
    this.mode = 'dev2';
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
    this.scale = 150;
    this.camera = new THREE.OrthographicCamera(this.width/-this.scale, this.width/this.scale, this.height/this.scale, this.height/-this.scale, 1, 1000);
    this.camera.updateProjectionMatrix();
    this.camera.position.set(20, 20, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // events
    $(window).on('resize', () => { this.onResize(); });

    // time
    this.time = (new Date()).getTime();
    this.age = 0;

    // post-processing
    this.initPostProcessing();

    // run
    this.ready = true;
    this.beforeLoop();
    this.loop();
  }

  createScene() {
    this.scene = new THREE.Scene();

    // scene objects
    this.logo = new Logo();

    // add to scene
    this.scene.add(this.logo.object);
  }

  initPostProcessing() {
    // post-processing passes
    this.renderPass = new THREE.RenderPass(this.scene, this.camera);
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

  onResize() {
    this.width = (this.mode == 'dev') ? 800 : window.innerWidth;
    this.height = (this.mode == 'dev') ? 600 : window.innerHeight;
    this.size.x = this.width;
    this.size.y = this.height;
    this.camera.left = this.width / -this.scale;
    this.camera.right = this.width / this.scale;
    this.camera.top = this.height / this.scale;
    this.camera.bottom = this.height / -this.scale;
    this.camera.updateProjectionMatrix();

    // update renderer & passes
    this.renderer.setSize(this.width, this.height);
    this.bloomPass.setSize(this.width, this.height);
    this.mechanicsPass.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
  }

  update(delta) {
    this.logo.update(delta);
  }

  render(delta) {
    this.composer.render(delta);
  }

  beforeLoop() {
    // pre loop actions
    
    this.logo.start();
  }

  loop() {
    const loop2 = () => {this.loop();};
    setTimeout(function() {
      requestAnimationFrame(loop2);
    },1000 / 24);

    // requestAnimationFrame(() => {this.loop();});

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
