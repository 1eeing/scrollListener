import { useEffect } from 'react';
import { createListener } from './scrollLinstener';
import { Opt } from './types';

const useScrollListener = (opt: Opt) => {
  useEffect(() => {
    const listener = createListener(opt);
    listener.start();
    return () => listener.stop();
  }, Object.values(opt));
}

export default useScrollListener;
