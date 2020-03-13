import { throttle, debounce } from './helper';
import { Opt, ScorllListenerProps, ScorllListenerInsProps } from './types';

const funcMap = {
  throttle,
  debounce,
}

const ScorllListener: ScorllListenerProps = {
  isWindow: void 0,
  eventTarget: void 0,
  delayType: void 0,
  offset: void 0,
  target: void 0,
  delay: void 0,
  positions: void 0,
  actions: void 0,

  init(opt) {
    this.delayType = opt.delayType;
    this.offset = opt.offset || 0;
    this.target = opt.target;
    this.positions = opt.positions;
    this.actions = opt.actions;
    this.delay = opt.delay || 500;

    if (this.delayType) {
      this._tick = funcMap[this.delayType](this._tick, this.delay);
    }
    if (!this.target) {
      this.eventTarget = window;
      this.isWindow = true;
    } else if (!document.getElementById(this.target)) {
      throw Error(`target is not found by document.getElementById(${this.target})`);
    } else {
      this.eventTarget = document.getElementById(this.target);
      this.isWindow = false;
    }
  },

  _computeOffsetTop(elem) {
    const curTop = elem.getBoundingClientRect().top;
    const scrollTop = this.isWindow ? document.documentElement.scrollTop : this.eventTarget.scrollTop;
    return curTop + scrollTop;
  },

  _computeMarkers() {
    return this.positions.map(item => {
      const elem = document.getElementById(item);
      return {
        position: this._computeOffsetTop(elem),
        id: item
      }
    })
  },

  _tick(e) {
    const curTop = this.isWindow ? document.documentElement.scrollTop : (e.target.scrollTop + this.eventTarget.getBoundingClientRect().top);
    const markers = this._computeMarkers();
    markers.filter(item => curTop >= item.position).forEach((item, idx) => {
      const action = this.actions[idx];
      action && action(item.id, item.position);
    });
  },
}

const ScorllListenerIns: ScorllListenerInsProps = Object.create(ScorllListener);

ScorllListenerIns.start = function () {
  this.eventTarget.addEventListener('scroll', this._tick);
}

ScorllListenerIns.stop = function () {
  this.eventTarget.removeEventListener('scroll', this._tick);
}

export { ScorllListenerIns };

export const createListener = (opt: Opt) => {
  const ins = Object.create(ScorllListenerIns);
  ins.init(opt);
  return ins;
}
