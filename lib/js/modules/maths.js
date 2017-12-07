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

const minAngleBetween = function(a1, a2) {
  return Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1))
}

export { vectorBetween, magnitude, normalise, minAngleBetween };
