import Config from './config';
import * as Maths from './maths';

// single value tween

class TweenSingle {
  constructor(root, attribute, speed) {
    this.root = root;
    this.attribute = attribute;
    this.active = false;
    this.changed = false;
    this.speed = Config.tween.speed;
    this.threshold = Config.tween.threshold;
    if (speed) {
      this.speed = speed;
    }
    this.target = false;
    this.state = {
      active: {
        value: root[attribute]
      },
      dormant: {
        value: root[attribute]
      }
    }
  }

  update(delta) {
    if (this.active) {
      if (this.target) {
        this.tweenValue(this.state.active.value, delta);
      }
    } else {
      if (this.target) {
        this.tweenValue(this.state.dormant.value, delta);
      }
    }
  }

  tweenValue(to, delta) {
    // tween value

    if (to == this.root[this.attribute]) {
      // set flag
      this.changed = false;
    } else {
      const vec = to - this.root[this.attribute];
      const mag = Math.abs(vec);

      if (mag < this.threshold) {
        this.root[this.attribute] += vec;
      } else {
        this.root[this.attribute] += vec * this.speed * delta;
      }

      // set flag
      this.changed = true;
    }
  }

  setActiveState(value) {
    this.state.active.value = value;
    this.target = true;

    if (this.active) {
      this.root[this.attribute] = value;
    }
  }

  setDormantState(value) {
    this.state.dormant.value = value;
    this.target = true;

    if (!this.active) {
      this.root[this.attribute] = value;
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

export default TweenSingle;
