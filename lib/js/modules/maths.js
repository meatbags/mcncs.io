const vectorBetween = function(from, to) {
  return new THREE.Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
}

const magnitude = function(vec) {
  return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2));
}

const normalise = function(vec, mag) {
  if (mag != 0) {
    vec.x /= mag;
    vec.y /= mag;
    vec.z /= mag;
  }

  return vec;
}

export { vectorBetween, magnitude, normalise };
