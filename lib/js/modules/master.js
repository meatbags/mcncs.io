import './mobile.js';
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
    this.camera = new Camera(this.width, this.height);

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

    const field = new Field(0, 0);
    this.scene.add(field.object);

    // add to scene
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

  onResize() {
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

  update(delta) {
    this.camera.update(delta);
    this.logo.update(delta, this.camera.angle);
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

    // animate title text
    const text = `<div class="letter">${$('.main__inner__title').html().split('').join('</div><div class="letter">')}</div>`;
    const ms = 200;
    $('.main__inner__title').html(text);
    $('.main__inner__title').addClass('active');
    setTimeout(() => {
      $('.main__inner__title .letter').each((i, e) => {
        setTimeout(
          () => {
            $(e).addClass('active red');
            setTimeout(
              () => {
                $(e).removeClass('red');
              }, ms
            )
          }
        , (i + 1) * ms)
      });
    }, 1000);

    // remove loading screen
    $('.loading').fadeOut(1000, () => { $('.loading').remove(); });
  }

  loop() {
    const reloop = () => {this.loop();};
    const fps = 1000 / 24;

    setTimeout(() => {
      requestAnimationFrame(reloop);
    }, fps);

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
