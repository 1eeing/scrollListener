export const throttle = (fn: (args: any) => void, delay: number) => {
  let last = 0;
  let timer;
  return function(...args) {
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
