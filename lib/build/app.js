var rkw =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _master = __webpack_require__(1);

var _master2 = _interopRequireDefault(_master);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = {
  init: function init() {
    App.master = new _master2.default();
    App.master.init();
    console.log('Mechanics is open source! https://github.com/meatbags/mcncs.io');
  }
};

window.onload = App.init;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

__webpack_require__(8);

__webpack_require__(4);

__webpack_require__(7);

__webpack_require__(6);

__webpack_require__(5);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Master = function () {
  function Master() {
    _classCallCheck(this, Master);
  }

  _createClass(Master, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // set up context
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setClearColor(0x222222, 1);
      document.getElementById('canvas-wrapper').appendChild(this.renderer.domElement);

      // scene
      this.scene = new THREE.Scene();
      this.block = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({}));
      this.light = new THREE.PointLight(0xffffff, 1, 50, 2);
      this.light.position.set(0, 2, 0);
      this.scene.add(this.block, this.light);

      // camera
      this.scale = 100;
      this.camera = new THREE.OrthographicCamera(this.width / -this.scale, this.width / this.scale, this.height / this.scale, this.height / -this.scale, 1, 1000);
      this.camera.updateProjectionMatrix();
      //this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
      //this.camera.up = new THREE.Vector3(0, 1, 0);
      this.camera.position.set(2, 5, 2);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      // events
      $(window).on('resize', function () {
        _this.onResize();
      });

      // time
      this.time = new Date().getTime();

      // post-processing
      this.initPost();

      // run
      this.ready = true;
      this.loop();
    }
  }, {
    key: 'initPost',
    value: function initPost() {
      // post-processing passes
      this.renderPass = new THREE.RenderPass(this.scene, this.camera);
      this.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(this.width, this.height), 1.0, 0.9, .9); // resolution, strength, radius, threshold
      this.mechanicsPass = new THREE.MechanicsPass();
      this.mechanicsPass.renderToScreen = true;

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
  }, {
    key: 'onResize',
    value: function onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      //this.camera.aspect = this.width / this.height;
      this.camera.left = this.width / -this.scale;
      this.camera.right = this.width / this.scale;
      this.camera.top = this.height / this.scale;
      this.camera.bottom = this.height / -this.scale;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }
  }, {
    key: 'update',
    value: function update(delta) {
      this.block.rotation.y += delta * 0.1;
    }
  }, {
    key: 'render',
    value: function render(delta) {
      this.composer.render(delta);
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.loop();
      });

      // time
      var now = new Date().getTime();
      var delta = (now - this.time) / 1000.;
      this.time = now;

      if (this.ready) {
        this.update(delta);
        this.render(delta);
      }
    }
  }]);

  return Master;
}();

exports.default = Master;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function (renderer, renderTarget) {

	this.renderer = renderer;

	if (renderTarget === undefined) {

		var parameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		};

		var size = renderer.getDrawingBufferSize();
		renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
		renderTarget.texture.name = 'EffectComposer.rt1';
	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();
	this.renderTarget2.texture.name = 'EffectComposer.rt2';

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	// dependencies

	if (THREE.CopyShader === undefined) {

		console.error('THREE.EffectComposer relies on THREE.CopyShader');
	}

	if (THREE.ShaderPass === undefined) {

		console.error('THREE.EffectComposer relies on THREE.ShaderPass');
	}

	this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
};

Object.assign(THREE.EffectComposer.prototype, {

	swapBuffers: function swapBuffers() {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;
	},

	addPass: function addPass(pass) {

		this.passes.push(pass);

		var size = this.renderer.getDrawingBufferSize();
		pass.setSize(size.width, size.height);
	},

	insertPass: function insertPass(pass, index) {

		this.passes.splice(index, 0, pass);
	},

	render: function render(delta) {

		var maskActive = false;

		var pass,
		    i,
		    il = this.passes.length;

		for (i = 0; i < il; i++) {

			pass = this.passes[i];

			if (pass.enabled === false) continue;

			pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

			if (pass.needsSwap) {

				if (maskActive) {

					var context = this.renderer.context;

					context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);

					this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);

					context.stencilFunc(context.EQUAL, 1, 0xffffffff);
				}

				this.swapBuffers();
			}

			if (THREE.MaskPass !== undefined) {

				if (pass instanceof THREE.MaskPass) {

					maskActive = true;
				} else if (pass instanceof THREE.ClearMaskPass) {

					maskActive = false;
				}
			}
		}
	},

	reset: function reset(renderTarget) {

		if (renderTarget === undefined) {

			var size = this.renderer.getDrawingBufferSize();

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize(size.width, size.height);
		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;
	},

	setSize: function setSize(width, height) {

		this.renderTarget1.setSize(width, height);
		this.renderTarget2.setSize(width, height);

		for (var i = 0; i < this.passes.length; i++) {

			this.passes[i].setSize(width, height);
		}
	}

});

THREE.Pass = function () {

	// if set to true, the pass is processed by the composer
	this.enabled = true;

	// if set to true, the pass indicates to swap read and write buffer after rendering
	this.needsSwap = true;

	// if set to true, the pass clears its buffer before rendering
	this.clear = false;

	// if set to true, the result of the pass is rendered to screen
	this.renderToScreen = false;
};

Object.assign(THREE.Pass.prototype, {

	setSize: function setSize(width, height) {},

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		console.error('THREE.Pass: .render() must be implemented in derived pass.');
	}

});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function (scene, camera, overrideMaterial, clearColor, clearAlpha) {

		THREE.Pass.call(this);

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;
};

THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.RenderPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

				var oldAutoClear = renderer.autoClear;
				renderer.autoClear = false;

				this.scene.overrideMaterial = this.overrideMaterial;

				var oldClearColor, oldClearAlpha;

				if (this.clearColor) {

						oldClearColor = renderer.getClearColor().getHex();
						oldClearAlpha = renderer.getClearAlpha();

						renderer.setClearColor(this.clearColor, this.clearAlpha);
				}

				if (this.clearDepth) {

						renderer.clearDepth();
				}

				renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

				if (this.clearColor) {

						renderer.setClearColor(oldClearColor, oldClearAlpha);
				}

				this.scene.overrideMaterial = null;
				renderer.autoClear = oldAutoClear;
		}

});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author spidersharma / http://eduperiment.com/
 *
 * Inspired from Unreal Engine
 * https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
 */
THREE.UnrealBloomPass = function (resolution, strength, radius, threshold) {

	THREE.Pass.call(this);

	this.strength = strength !== undefined ? strength : 1;
	this.radius = radius;
	this.threshold = threshold;
	this.resolution = resolution !== undefined ? new THREE.Vector2(resolution.x, resolution.y) : new THREE.Vector2(256, 256);

	// render targets
	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
	this.renderTargetsHorizontal = [];
	this.renderTargetsVertical = [];
	this.nMips = 5;
	var resx = Math.round(this.resolution.x / 2);
	var resy = Math.round(this.resolution.y / 2);

	this.renderTargetBright = new THREE.WebGLRenderTarget(resx, resy, pars);
	this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
	this.renderTargetBright.texture.generateMipmaps = false;

	for (var i = 0; i < this.nMips; i++) {

		var renderTarget = new THREE.WebGLRenderTarget(resx, resy, pars);

		renderTarget.texture.name = "UnrealBloomPass.h" + i;
		renderTarget.texture.generateMipmaps = false;

		this.renderTargetsHorizontal.push(renderTarget);

		var renderTarget = new THREE.WebGLRenderTarget(resx, resy, pars);

		renderTarget.texture.name = "UnrealBloomPass.v" + i;
		renderTarget.texture.generateMipmaps = false;

		this.renderTargetsVertical.push(renderTarget);

		resx = Math.round(resx / 2);

		resy = Math.round(resy / 2);
	}

	// luminosity high pass material

	if (THREE.LuminosityHighPassShader === undefined) console.error("THREE.UnrealBloomPass relies on THREE.LuminosityHighPassShader");

	var highPassShader = THREE.LuminosityHighPassShader;
	this.highPassUniforms = THREE.UniformsUtils.clone(highPassShader.uniforms);

	this.highPassUniforms["luminosityThreshold"].value = threshold;
	this.highPassUniforms["smoothWidth"].value = 0.01;

	this.materialHighPassFilter = new THREE.ShaderMaterial({
		uniforms: this.highPassUniforms,
		vertexShader: highPassShader.vertexShader,
		fragmentShader: highPassShader.fragmentShader,
		defines: {}
	});

	// Gaussian Blur Materials
	this.separableBlurMaterials = [];
	var kernelSizeArray = [3, 5, 7, 9, 11];
	var resx = Math.round(this.resolution.x / 2);
	var resy = Math.round(this.resolution.y / 2);

	for (var i = 0; i < this.nMips; i++) {

		this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));

		this.separableBlurMaterials[i].uniforms["texSize"].value = new THREE.Vector2(resx, resy);

		resx = Math.round(resx / 2);

		resy = Math.round(resy / 2);
	}

	// Composite material
	this.compositeMaterial = this.getCompositeMaterial(this.nMips);
	this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
	this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
	this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
	this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
	this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
	this.compositeMaterial.uniforms["bloomStrength"].value = strength;
	this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
	this.compositeMaterial.needsUpdate = true;

	var bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
	this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
	this.bloomTintColors = [new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1)];
	this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;

	// copy material
	if (THREE.CopyShader === undefined) {

		console.error("THREE.BloomPass relies on THREE.CopyShader");
	}

	var copyShader = THREE.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone(copyShader.uniforms);
	this.copyUniforms["opacity"].value = 1.0;

	this.materialCopy = new THREE.ShaderMaterial({
		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		depthWrite: false,
		transparent: true
	});

	this.enabled = true;
	this.needsSwap = false;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	this.scene = new THREE.Scene();

	this.basic = new THREE.MeshBasicMaterial();

	this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add(this.quad);
};

THREE.UnrealBloomPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	constructor: THREE.UnrealBloomPass,

	dispose: function dispose() {

		for (var i = 0; i < this.renderTargetsHorizontal.length; i++) {

			this.renderTargetsHorizontal[i].dispose();
		}

		for (var i = 0; i < this.renderTargetsVertical.length; i++) {

			this.renderTargetsVertical[i].dispose();
		}

		this.renderTargetBright.dispose();
	},

	setSize: function setSize(width, height) {

		var resx = Math.round(width / 2);
		var resy = Math.round(height / 2);

		this.renderTargetBright.setSize(resx, resy);

		for (var i = 0; i < this.nMips; i++) {

			this.renderTargetsHorizontal[i].setSize(resx, resy);
			this.renderTargetsVertical[i].setSize(resx, resy);

			this.separableBlurMaterials[i].uniforms["texSize"].value = new THREE.Vector2(resx, resy);

			resx = Math.round(resx / 2);
			resy = Math.round(resy / 2);
		}
	},

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		this.oldClearColor.copy(renderer.getClearColor());
		this.oldClearAlpha = renderer.getClearAlpha();
		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		renderer.setClearColor(new THREE.Color(0, 0, 0), 0);

		if (maskActive) renderer.context.disable(renderer.context.STENCIL_TEST);

		// Render input to screen

		if (this.renderToScreen) {

			this.quad.material = this.basic;
			this.basic.map = readBuffer.texture;

			renderer.render(this.scene, this.camera, undefined, true);
		}

		// 1. Extract Bright Areas

		this.highPassUniforms["tDiffuse"].value = readBuffer.texture;
		this.highPassUniforms["luminosityThreshold"].value = this.threshold;
		this.quad.material = this.materialHighPassFilter;

		renderer.render(this.scene, this.camera, this.renderTargetBright, true);

		// 2. Blur All the mips progressively

		var inputRenderTarget = this.renderTargetBright;

		for (var i = 0; i < this.nMips; i++) {

			this.quad.material = this.separableBlurMaterials[i];

			this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
			this.separableBlurMaterials[i].uniforms["direction"].value = THREE.UnrealBloomPass.BlurDirectionX;
			renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[i], true);

			this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
			this.separableBlurMaterials[i].uniforms["direction"].value = THREE.UnrealBloomPass.BlurDirectionY;
			renderer.render(this.scene, this.camera, this.renderTargetsVertical[i], true);

			inputRenderTarget = this.renderTargetsVertical[i];
		}

		// Composite All the mips

		this.quad.material = this.compositeMaterial;
		this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
		this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
		this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;

		renderer.render(this.scene, this.camera, this.renderTargetsHorizontal[0], true);

		// Blend it additively over the input texture

		this.quad.material = this.materialCopy;
		this.copyUniforms["tDiffuse"].value = this.renderTargetsHorizontal[0].texture;

		if (maskActive) renderer.context.enable(renderer.context.STENCIL_TEST);

		if (this.renderToScreen) {

			renderer.render(this.scene, this.camera, undefined, false);
		} else {

			renderer.render(this.scene, this.camera, readBuffer, false);
		}

		// Restore renderer settings

		renderer.setClearColor(this.oldClearColor, this.oldClearAlpha);
		renderer.autoClear = oldAutoClear;
	},

	getSeperableBlurMaterial: function getSeperableBlurMaterial(kernelRadius) {

		return new THREE.ShaderMaterial({

			defines: {
				"KERNEL_RADIUS": kernelRadius,
				"SIGMA": kernelRadius
			},

			uniforms: {
				"colorTexture": { value: null },
				"texSize": { value: new THREE.Vector2(0.5, 0.5) },
				"direction": { value: new THREE.Vector2(0.5, 0.5) }
			},

			vertexShader: "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader: "#include <common>\
				varying vec2 vUv;\n\
				uniform sampler2D colorTexture;\n\
				uniform vec2 texSize;\
				uniform vec2 direction;\
				\
				float gaussianPdf(in float x, in float sigma) {\
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\
				}\
				void main() {\n\
					vec2 invSize = 1.0 / texSize;\
					float fSigma = float(SIGMA);\
					float weightSum = gaussianPdf(0.0, fSigma);\
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {\
						float x = float(i);\
						float w = gaussianPdf(x, fSigma);\
						vec2 uvOffset = direction * invSize * x;\
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\
						diffuseSum += (sample1 + sample2) * w;\
						weightSum += 2.0 * w;\
					}\
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\
				}"
		});
	},

	getCompositeMaterial: function getCompositeMaterial(nMips) {

		return new THREE.ShaderMaterial({

			defines: {
				"NUM_MIPS": nMips
			},

			uniforms: {
				"blurTexture1": { value: null },
				"blurTexture2": { value: null },
				"blurTexture3": { value: null },
				"blurTexture4": { value: null },
				"blurTexture5": { value: null },
				"dirtTexture": { value: null },
				"bloomStrength": { value: 1.0 },
				"bloomFactors": { value: null },
				"bloomTintColors": { value: null },
				"bloomRadius": { value: 0.0 }
			},

			vertexShader: "varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader: "varying vec2 vUv;\
				uniform sampler2D blurTexture1;\
				uniform sampler2D blurTexture2;\
				uniform sampler2D blurTexture3;\
				uniform sampler2D blurTexture4;\
				uniform sampler2D blurTexture5;\
				uniform sampler2D dirtTexture;\
				uniform float bloomStrength;\
				uniform float bloomRadius;\
				uniform float bloomFactors[NUM_MIPS];\
				uniform vec3 bloomTintColors[NUM_MIPS];\
				\
				float lerpBloomFactor(const in float factor) { \
					float mirrorFactor = 1.2 - factor;\
					return mix(factor, mirrorFactor, bloomRadius);\
				}\
				\
				void main() {\
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \
													 lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \
													 lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \
													 lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \
													 lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\
				}"
		});
	}

});

THREE.UnrealBloomPass.BlurDirectionX = new THREE.Vector2(1.0, 0.0);
THREE.UnrealBloomPass.BlurDirectionY = new THREE.Vector2(0.0, 1.0);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author bhouston / http://clara.io/
 *
 * Luminosity
 * http://en.wikipedia.org/wiki/Luminosity
 */

THREE.LuminosityHighPassShader = {

		shaderID: "luminosityHighPass",

		uniforms: {

				"tDiffuse": { type: "t", value: null },
				"luminosityThreshold": { type: "f", value: 1.0 },
				"smoothWidth": { type: "f", value: 1.0 },
				"defaultColor": { type: "c", value: new THREE.Color(0x000000) },
				"defaultOpacity": { type: "f", value: 0.0 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float v = dot( texel.xyz, luma );", "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")

};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

		uniforms: {

				"tDiffuse": { value: null },
				"opacity": { value: 1.0 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")

};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function (shader, textureID) {

	THREE.Pass.call(this);

	this.textureID = textureID !== undefined ? textureID : "tDiffuse";

	if (shader instanceof THREE.ShaderMaterial) {

		this.uniforms = shader.uniforms;

		this.material = shader;
	} else if (shader) {

		this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

		this.material = new THREE.ShaderMaterial({

			defines: shader.defines || {},
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		});
	}

	this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	this.scene = new THREE.Scene();

	this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add(this.quad);
};

THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	constructor: THREE.ShaderPass,

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		if (this.uniforms[this.textureID]) {

			this.uniforms[this.textureID].value = readBuffer.texture;
		}

		this.quad.material = this.material;

		if (this.renderToScreen) {

			renderer.render(this.scene, this.camera);
		} else {

			renderer.render(this.scene, this.camera, writeBuffer, this.clear);
		}
	}

});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


THREE.FilmShader = {

		uniforms: {

				"tDiffuse": { value: null },
				"time": { value: 0.0 },
				"nIntensity": { value: 0.5 },
				"sIntensity": { value: 0.05 },
				"sCount": { value: 4096 },
				"grayscale": { value: 1 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["#include <common>",

		// control parameter
		"uniform float time;", "uniform bool grayscale;",

		// noise effect intensity value (0 = no effect, 1 = full effect)
		"uniform float nIntensity;",

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		"uniform float sIntensity;",

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		"uniform float sCount;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {",

		// sample the source
		"vec4 cTextureScreen = texture2D( tDiffuse, vUv );",

		// make some noise
		"float dx = rand( vUv + time );",

		// add noise
		"vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );",

		// get us a sine and cosine
		"vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",

		// add scanlines
		"cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;",

		// interpolate between source and result by intensity
		"cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",

		// convert to grayscale if desired
		"if( grayscale ) {", "cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );", "}", "gl_FragColor =  vec4( cResult, cTextureScreen.a );", "}"].join("\n")

};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


THREE.FilmPass = function (noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {

	THREE.Pass.call(this);

	if (THREE.FilmShader === undefined) console.error("THREE.FilmPass relies on THREE.FilmShader");

	var shader = THREE.FilmShader;

	this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

	this.material = new THREE.ShaderMaterial({

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	});

	if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
	if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
	if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
	if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;

	this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	this.scene = new THREE.Scene();

	this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add(this.quad);
};

THREE.FilmPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	constructor: THREE.FilmPass,

	render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

		this.uniforms["tDiffuse"].value = readBuffer.texture;
		this.uniforms["time"].value += delta;

		this.quad.material = this.material;

		if (this.renderToScreen) {

			renderer.render(this.scene, this.camera);
		} else {

			renderer.render(this.scene, this.camera, writeBuffer, this.clear);
		}
	}

});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  @author meatbags / https://github.com/meatbags
  **/

// shader
THREE.MechanicsShader = {
  uniforms: {
    'tDiffuse': { value: null },
    'time': { value: 0. }
  },
  vertexShader: '\n    varying vec2 vUv;\n\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ',
  fragmentShader: '\n    varying vec2 vUv;\n    uniform sampler2D tDiffuse;\n    uniform float time;\n\n    float rand(vec2 seed) {\n      return fract(sin(dot(seed.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    }\n\n    void main() {\n      vec4 tex = texture2D(tDiffuse, vUv);\n      vec4 samp = texture2D(tDiffuse, vec2(vUv.x, vUv.y - 0.01));\n\n      tex = (tex + samp) / 2.0;\n      float t = max(0.0, sin(time));\n      float noise = rand(vUv + time) * 0.1;\n      float r = clamp(tex.r + noise, 0.0, 1.0);\n\n      gl_FragColor = vec4(r, tex.b * t, tex.g, 0.);\n    }\n  '
};

// render pass
THREE.MechanicsPass = function () {
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
  render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.shader.uniforms['tDiffuse'].value = readBuffer.texture;
    this.shader.uniforms['time'].value += delta;

    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear);
    }
  }
});

/***/ })
/******/ ]);