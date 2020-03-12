interface Opt {
  offset?: number
  target?: string
  positions: string[]
  actions: (() => void)[]
}

const ScorllListener = {
  isInit: false,
  offset: void 0,
  target: void 0,
  positions: void 0,
  isWindow: void 0,
  eventTarget: void 0,

  _init(opt: Opt) {
    this.offset = opt.offset || 0;
    this.target = opt.target;
    this.positions = opt.positions;
    this.isInit = true;
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

  _computeOffsetTop(elem: HTMLElement) {
    const curTop = elem.getBoundingClientRect().top;
    const scrollTop = this.isWindow ? document.documentElement.scrollTop : this.eventTarget.scrollTop;
    return curTop + scrollTop;
  },

  _computeMarkers() {
    return this.positions.map(item => {
      const elem = document.getElementById(item);
      return this._computeOffsetTop(elem);
    })
  },

  _tick() {

  },

  start() {
    this.eventTarget.addEventListener('scroll', this._tick);
  },

  destroy() {
    this.eventTarget.removeEventListener('scroll', this._tick);
  },
}

export const createListener = (opt: Opt) => {
  const ins = Object.create(ScorllListener);
  ins._init(opt);
  return ins;
}

export default ScorllListener;
