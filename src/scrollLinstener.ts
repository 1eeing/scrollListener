import { throttle, debounce, requestIdleCallbackTrigger } from './helper';
import { Opt, ScorllListenerProps, ScorllListenerInsProps, Marker } from './types';

const funcMap = {
  throttle,
  debounce,
}

const ScorllListener: ScorllListenerProps = {
  isWindow: void 0,
  eventTarget: void 0,
  hasTriggerd: {},
  triggerType: void 0,
  delayType: void 0,
  delay: void 0,
  offset: void 0,
  target: void 0,
  needRequestIdleCallback: void 0,
  positions: void 0,
  actions: void 0,

  init(opt) {
    this.triggerType = opt.triggerType || 'once';
    this.delayType = opt.delayType;
    this.delay = opt.delay || 500;
    this.offset = opt.offset || 0;
    this.target = opt.target;
    this.positions = opt.positions;
    this.actions = opt.actions;
    this.needRequestIdleCallback = opt.needRequestIdleCallback || false;

    if (this.delayType) {
      const bindTick = funcMap[this.delayType];
      if (!bindTick) {
        throw Error('The delayType is not supposed');
      }
      this._tick = bindTick(this._tick, this.delay);
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

  destroy() {
    this.isWindow = void 0;
    this.eventTarget = void 0;
    this.hasTriggerd = {};
    this.triggerType = void 0;
    this.delayType = void 0;
    this.delay = void 0;
    this.offset = void 0;
    this.target = void 0;
    this.needRequestIdleCallback = void 0;
    this.positions = void 0;
    this.actions = void 0;
  },

  _computeOffsetTop(elem) {
    const curTop = elem.getBoundingClientRect().top;
    const scrollTop = this.isWindow ? document.documentElement.scrollTop : (this.eventTarget as HTMLElement).scrollTop;
    return curTop + scrollTop;
  },

  _computeMarkers() {
    return this.positions.map(item => {
      const elem = document.getElementById(item);
      return {
        position: this._computeOffsetTop(elem),
        e: elem,
        id: item,
      }
    })
  },

  _filterIsMatch(item: Marker, idx: number) {
    return !!this.actions[idx]
  },

  _filterIsNotOnce(item: Marker, idx: number) {
    return this.triggerType !== 'once' || !this.hasTriggerd[item.id];
  },

  _filterIsVisible(curTop: number, item: Marker) {
    if (this.triggerType === 'appearing') {
      return curTop >= item.position && curTop <= (item.position + item.e.scrollHeight);
    }
    return curTop >= item.position;
  },

  _triggerAction(item: Marker, idx: number) {
    const action = () => {
      this.actions[idx](item.e, item.position);
      if (this.triggerType === 'once') {
        this.hasTriggerd[item.id] = true;
      }
    }
    this.needRequestIdleCallback ?
      requestIdleCallbackTrigger(action) :
      action();
  },

  _tick(e) {
    const curTop = this.isWindow ? document.documentElement.scrollTop : (e.target.scrollTop + (this.eventTarget as HTMLElement).getBoundingClientRect().top);
    const markers = this._computeMarkers();
    markers
      .filter(this._filterIsMatch)
      .filter(this._filterIsNotOnce)
      .filter(this._filterIsVisible.bind(this, curTop))
      .forEach(this._triggerAction);
  },
}

const ScorllListenerIns: ScorllListenerInsProps = Object.create(ScorllListener);

ScorllListenerIns.start = function () {
  this.eventTarget.addEventListener('scroll', this._tick.bind(this));
}

ScorllListenerIns.stop = function () {
  this.eventTarget.removeEventListener('scroll', this._tick.bind(this));
  this.destroy();
}

export { ScorllListenerIns };

export const createListener = (opt: Opt): ScorllListenerInsProps => {
  const ins = Object.create(ScorllListenerIns);
  ins.init(opt);
  return ins;
}
