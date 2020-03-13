export interface Marker {
  position: number
  id: string
}

export interface Opt {
  delayType?: 'throttle' | 'debounce'
  offset?: number
  target?: string
  delay?: number
  positions: string[]
  actions: ((id: string, offsetTop: number) => void)[]
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
