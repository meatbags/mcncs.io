import '../lib';
import './glsl/mechanics.js';
import './glsl/noise.js';
import { Config } from './conf';
import { Scene } from './scene';

class Master {
  constructor() {
    // master scene handler

    this.mode = 'production';
    this.isMobile = window.mobilecheck();
    this.width = (this.mode && this.mode == 'dev') ? 800 : window.innerWidth;
    this.height = (this.mode && this.mode == 'dev') ? 600 : window.innerHeight;
    this.size = new THREE.Vector2(this.width, this.height);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x111112, 1);
    $('#canvas-wrapper').append(this.renderer.domElement);

    // create scene, run

    this.scene = new Scene(this.width, this.height, this.isMobile);
    this.target = this.scene.getScene();
    this.camera = this.scene.getCamera();
    this.events();
    this.postProcessing();
    this.resize();
  }

  events() {
    // set up doc & timing events

    this.onMenu = () => {
      this.logo.hide();
      this.camera.zoomOut();
    };
    this.onMenuClose = () => {
      this.logo.show();
      this.camera.zoomIn();
    };
    this.resize = () => {
      if (!this.isMobile || this.width != window.innerWidth) {
        this.width = (this.mode && this.mode == 'dev') ? 800 : window.innerWidth;
        this.height = (this.mode && this.mode == 'dev') ? 600 : window.innerHeight;
        this.size.x = this.width;
        this.size.y = this.height;
        this.scene.resize(this.width, this.height);
        this.renderer.setSize(this.width, this.height);
        this.bloomPass.setSize(this.width, this.height);
        this.mechanicsPass.setSize(this.width, this.height);
        this.composer.setSize(this.width, this.height);
      }
    };

    $(window).on('resize', () => { this.resize(); });
    $(window).on('blur', () => {
      this.paused = true;
    });
    $(window).on('focus', () => {
      this.time = (new Date()).getTime();
      this.paused = false;
      this.loop();
    });

    this.time = (new Date()).getTime();
    this.age = 0;
    this.paused = false;
    this.ready = true;
    this.fps = 1000 / 20;
  }

  postProcessing() {
    // post-processing passes

    const strength = 0.7;
    const radius = 1.0;
    const threshold = 0.7;
    this.renderPass = new THREE.RenderPass(this.target, this.camera);
    this.mechanicsPass = new THREE.MechanicsPass(this.size);
    this.bloomPass = new THREE.UnrealBloomPass(this.size, strength, radius, threshold);
    this.FXAAPass = new THREE.ShaderPass(THREE.FXAAShader);
    this.noisePass = new THREE.NoisePass();
    this.noisePass.renderToScreen = true;

    // fx composer

    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.mechanicsPass);
    this.composer.addPass(this.FXAAPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.noisePass);

    // enable gamma io

    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }

  loop() {
    // main loop

    if (!this.paused) {
      if (!this.loopLock) {
        this.loopLock = true;
        const reloop = () => {this.loop();};

        setTimeout(() => {
          this.loopLock = false;
          requestAnimationFrame(reloop);
        }, this.fps);
      }

      const now = (new Date()).getTime();
      const delta = (now - this.time) / 1000.;
      this.time = now;
      this.age += delta;

      if (this.ready) {
        this.scene.update(delta);
        this.composer.render(delta);
      }
    }
  }
}

export { Master };
