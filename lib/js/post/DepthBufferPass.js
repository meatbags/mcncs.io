/**
 * @author meatbags / https://github.com/meatbags
 */


THREE.DepthBufferPass = function(scene, camera, width, height) {
  if (THREE.DepthShader === undefined) {
    console.warn('THREE.DepthShader not found.');
    return new THREE.ShaderPass();
  }

  // init
  THREE.ShaderPass.call(this, THREE.DepthShader);
  this.width = width;
  this.height = height;
  this.renderToScreen = false;
  this.camera = camera;
  this.scene = scene;
  this.depthMaterial = new THREE.MeshDepthMaterial();
  this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
  this.depthMaterial.blending = THREE.NoBlending;
  this.depthRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter});
};

THREE.DepthBufferPass.prototype = {
  render: function(renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.scene.overrideMaterial = this.depthMaterial;
    renderer.render(this.scene, this.camera, this.depthRenderTarget, true);
    this.scene.overrideMaterial = null;
    THREE.ShaderPass.prototype.render.call(this, renderer, writeBuffer, readBuffer, delta, maskActive);
  },

  setSize: function(width, height) {
  	this.width = width;
  	this.height = height;
  	this.depthRenderTarget.setSize( this.width, this.height );
  }
};
