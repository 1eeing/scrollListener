import { throttle } from './helper';
import { Opt, ScorllListenerProps } from './types';

const ScorllListener: ScorllListenerProps = {
  isWindow: void 0,
  eventTarget: void 0,
  offset: void 0,
  target: void 0,
  interval: void 0,
  positions: void 0,
  actions: void 0,

  _init(opt) {
    this.offset = opt.offset || 0;
    this.target = opt.target;
    this.positions = opt.positions;
    this.actions = opt.actions;
    this.interval = opt.interval || 500;
    this._tick = throttle(this._tick, this.interval);
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

  start() {
    this.eventTarget.addEventListener('scroll', this._tick);
  },

  stop() {
    this.eventTarget.removeEventListener('scroll', this._tick);
  },
}

export const createListener = (opt: Opt) => {
  const ins = Object.create(ScorllListener);
  ins._init(opt);
  return ins;
}

export default ScorllListener;
