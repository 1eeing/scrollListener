type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

export interface Marker {
  position: number
  e: HTMLElement
  id: string
  disabled: boolean
}

export interface Opt {
  triggerType?: 'appeard' | 'appearing' | 'once'
  delayType?: 'throttle' | 'debounce'
  delay?: number
  offset?: number
  target?: string
  needRequestIdleCallback?: boolean
  positions: string[]
  actions: ((e: HTMLElement, position: number) => void)[]
}

export interface ScorllListenerProps extends Opt {
  isWindow: boolean
  eventTarget: Window | HTMLElement
  hasTriggerd: {[key: string]: boolean}

  init: (opt: Opt) => void
  destroy: () => void

  _computeOffsetTop: (elm: HTMLElement) => number
  _computeMarkers: () => Marker[]
  _filterIsMatch: (item: Marker, idx: number) => Marker
  _filterIsNotOnce: (item: Marker, idx: number) => Marker
  _filterIsVisible: (curTop: number, item: Marker) => Marker
  _triggerAction: (item: Marker, idx: number) => void
  _tick: (e: any) => void
}

export interface ScorllListenerInsProps extends ScorllListenerProps {
  start: () => void
  stop: () => void
}
