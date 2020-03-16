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
}

export interface Opt {
  delayType?: 'throttle' | 'debounce'
  offset?: number
  target?: string
  delay?: number
  requestIdleCallback?: boolean
  positions: string[]
  actions: ((e: HTMLElement, position: number) => void)[]
}

export interface ScorllListenerProps extends Opt {
  isWindow: boolean
  eventTarget: Window | HTMLElement

  init: (opt: Opt) => void

  _computeOffsetTop: (elm: HTMLElement) => number
  _computeMarkers: () => Marker[]
  _tick: (e: any) => void
}

export interface ScorllListenerInsProps extends ScorllListenerProps {
  start: () => void
  stop: () => void
}
