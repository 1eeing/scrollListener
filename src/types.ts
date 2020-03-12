export interface Marker {
  position: string
  id: string
}

export interface Opt {
  offset?: number
  target?: string
  interval?: number
  positions: string[]
  actions: ((id: string, offsetTop: number) => void)[]
}

export interface ScorllListenerProps extends Opt {
  isWindow: boolean
  eventTarget: Window | HTMLElement

  _init: (opt: Opt) => void
  _computeOffsetTop: (elm: HTMLElement) => number
  _computeMarkers: () => Marker[]
  _tick: (e: any) => void

  start: () => void
  stop: () => void
}
