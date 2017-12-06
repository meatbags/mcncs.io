import '../post/EffectComposer.js';
import '../post/ShaderPass.js';
import '../post/RenderPass.js';
import '../post/CopyShader.js';
import '../post/LuminosityHighPassShader.js';
import '../post/UnrealBloomPass.js';
import '../post/FXAA.js';
import './mechanics.js';
import './depth.js';
import './noise.js';

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
    this.loop();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.material = new THREE.ShaderMaterial(THREE.DepthShader);
    //this.material.transparent = true;
    //this.material.blending = THREE.AdditiveBlending;
    //this.material.side = THREE.DoubleSide;

    // scene objects
    this.logo = {
      object: new THREE.Group(),
      column1: new THREE.Mesh(new THREE.BoxBufferGeometry(4, 1, 1), this.material),
      column2: new THREE.Mesh(new THREE.BoxBufferGeometry(4, 1, 1), this.material),
      column3: new THREE.Mesh(new THREE.BoxBufferGeometry(4, 1, 1), this.material),
      block1: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 2), this.material),
      block2: new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 2), this.material)
    };
    this.logo.column1.position.z = -2;
    this.logo.column3.position.z = 2;
    this.logo.block1.position.set(-1.5, 0, -1);
    this.logo.block2.position.set(0, 0, 1);
    this.logo.object.add(
      this.logo.column1,
      this.logo.column2,
      this.logo.column3,
      this.logo.block1,
      this.logo.block2
    );
    this.logo.object.rotation.x = Math.PI;
    this.logo.object.rotation.z = Math.PI / 2;
    this.logo.object.position.y = 1;

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
    //const v = this.age / 5;
    //this.camera.position.set(Math.cos(v) * 20, 20, Math.sin(v) * 20);
    //this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  render(delta) {
    this.composer.render(delta);
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
