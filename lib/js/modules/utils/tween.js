import { Config } from '../config';
import * as Maths from './maths';

class Tween {
  constructor(root, speed) {
    this.root = root;
    this.active = false;
    this.complete = false;
    this.speed = Config.tween.speed;
    this.threshold = Config.tween.threshold;
    if (speed) {
      this.speed = speed;
    }
    this.targets = {
      position: false,
      rotation: false,
      scale: false
    };
    this.state = {
      active: {
        position: Maths.copyVector(root.position),
        rotation: Maths.copyVector(root.rotation),
        scale: Maths.copyVector(root.scale)
      },
      dormant: {
        position: Maths.copyVector(root.position),
        rotation: Maths.copyVector(root.rotation),
        scale: Maths.copyVector(root.scale)
      }
    };
  }

  update(delta) {
    // update transform
    this.complete = true;

    if (this.active) {
      if (this.targets.position) {
        if (!this.tweenVector(this.root.position, this.state.active.position, delta)) {
          this.complete = false;
        }
      }
      if (this.targets.rotation) {
        if (!this.tweenVector(this.root.rotation, this.state.active.rotation, delta)) {
          this.complete = false;
        }
      }
      if (this.targets.scale) {
        if (!this.tweenVector(this.root.scale, this.state.active.scale, delta)) {
          this.complete = false;
        }
      }
    } else {
      if (this.targets.position) {
        if (!this.tweenVector(this.root.position, this.state.dormant.position, delta)) {
          this.complete = false;
        }
      }
      if (this.targets.rotation) {
        if (!this.tweenVector(this.root.rotation, this.state.dormant.rotation, delta)) {
          this.complete = false;
        }
      }
      if (this.targets.scale) {
        if (!this.tweenVector(this.root.scale, this.state.dormant.scale, delta)) {
          this.complete = false;
        }
      }
    }
  }

  tweenVector(from, to, delta) {
    // linear tween, snap inside threshold

    let complete = false;
    const vec = Maths.vectorBetween(from, to);
    const mag = Maths.magnitude(vec);

    if (mag == 0.) {
      return true;
    }

    Maths.normalise(vec, mag);

    if (mag < this.threshold) {
      from.x += to.x - from.x;
      from.y += to.y - from.y;
      from.z += to.z - from.z;
      complete = true;
    } else {
      from.x += vec.x * this.speed * delta;
      from.y += vec.y * this.speed * delta;
      from.z += vec.z * this.speed * delta;
    }

    return complete;
  }

  setVector(target, vector) {
    target.x = vector.x;
    target.y = vector.y;
    target.z = vector.z;
  }

  setActiveState(position, rotation, scale) {
    // set active target

    if (position) {
      this.targets.position = true;
      this.state.active.position = position;
    } if (rotation) {
      this.targets.rotation = true;
      this.state.active.rotation = rotation;
    } if (scale) {
      this.targets.scale = true;
      this.state.active.scale = scale;
    }

    if (this.active) {
      this.setVector(this.root.position, position);
      this.setVector(this.root.rotation, rotation);
      this.setVector(this.root.scale, scale);
    }
  }

  setDormantState(position, rotation, scale) {
    // set dormant target

    if (position)
      this.state.dormant.position = position;
    if (rotation)
      this.state.dormant.rotation = rotation;
    if (scale)
      this.state.dormant.scale = scale;

    if (!this.active) {
      this.setVector(this.root.position, position);
      this.setVector(this.root.rotation, rotation);
      this.setVector(this.root.scale, scale);
    }
  }

  activate(time) {
    if (time) {
      setTimeout(() => { this.active = true; }, time);
    } else {
      this.active = true;
    }
  }

  deactivate(time) {
    if (time && time != 0) {
      setTimeout(() => { this.active = false; }, time);
    } else {
      this.active = false
    }
  }
}

export { Tween };
