# scrollListener

## Installation
```bash
npm install --save @1eeing/scroll-listener
```

## Usage
```js
import { createListener } from '@1eeing/scroll-listener';

// When domContentLoaded has triggered.
const listener = createListener({
  positions: ['main'],
  actions: [
    () => {
      console.log('The element which id is main has scrolled to top of the screen.')
    }
  ]
})

listener.start();

// When dom is removed
listener.stop();
```

```html
<body>
  <div id='main'></div>
</body>
```


If you are using React, you can use like this.
```js
import React, { useEffect } from 'react';
import { createListener } from '@1eeing/scroll-listener';

const App = () => {
  useEffect(() => {
    const listener = createListener({
      positions: ['main'],
      actions: [
        () => {
          console.log('The element which id is main has scrolled to top of the screen.')
        }
      ]
    })

    listener.start();
    return () => listener.stop();
  }, [])

  return (
    <div>
      <div id='main'>
        Hello world.
      </div>
    </div>
  )
}

export default App;
```

## Options
### positions
type: string[]
The id of the element you want to listen.

### actions
type: ((id: string, offsetTop: number) => void)[]
The action of the element you want to listen. Fired when the element scrolls to the top of the screen by default. One-to-one correspondence with postions.

### offset?
type: number
Offset from the top of the screen.

### target?
type: string
The target element'id you want to listen. Default the target is window.

### delayType?
type: 'throttle' | 'debounce'
Delay your action function. Default is empty.

### delay?
type: number
Only worked when delayType is not empty. Default is 500 ms.
