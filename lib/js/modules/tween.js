import Config from './config';
import * as Maths from './maths';

class Tween {
  constructor(root) {
    this.root = root;
    this.active = false;
    this.config = Config.tween;
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

    if (this.active) {
      if (this.targets.position)
        this.tweenVector(this.root.position, this.state.active.position, delta);
      if (this.targets.rotation)
        this.tweenVector(this.root.rotation, this.state.active.rotation, delta);
      if (this.targets.scale)
        this.tweenVector(this.root.scale, this.state.active.scale, delta);
    } else {
      if (this.targets.position)
        this.tweenVector(this.root.position, this.state.dormant.position, delta);
      if (this.targets.rotation)
        this.tweenVector(this.root.rotation, this.state.dormant.rotation, delta);
      if (this.targets.scale)
        this.tweenVector(this.root.scale, this.state.dormant.scale, delta);
    }
  }

  tweenVector(from, to, delta) {
    // linear tween, snap inside threshold

    const vec = Maths.vectorBetween(from, to);
    const mag = Maths.magnitude(vec);
    Maths.normalise(vec, mag);

    if (mag < this.config.threshold) {
      from.x += (to.x - from.x);
      from.y += (to.y - from.y);
      from.z += (to.z - from.z);
    } else {
      from.x += vec.x * this.config.speed * delta;
      from.y += vec.y * this.config.speed * delta;
      from.z += vec.z * this.config.speed * delta;
    }
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

export default Tween;
