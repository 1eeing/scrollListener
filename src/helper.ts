export const throttle = (fn: (...args: any) => void, delay: number) => {
  let last = 0;
  let timer;
  return function(this: any, ...args) {
      const cur = Date.now();
      if(cur - last > delay){
          fn.apply(this, args);
          last = cur;
      }else{
          clearTimeout(timer);
          timer = setTimeout(() => {
              fn.apply(this, args);
              last = cur;
          }, delay);
      }
  }
}

export const debounce = (fn: (...args: any) => void, delay: number) => {
  let timer;
  return function(this: any, ...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
          fn.apply(this, args);
      }, delay)
  }
};

export const requestIdleCallbackTrigger = (fn: (...args: any) => any) => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(fn)
  }
  fn();
}
