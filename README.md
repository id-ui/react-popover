# Popover React Component

[![NPM](https://img.shields.io/npm/v/@kaprisa57/react-popover.svg)](https://www.npmjs.com/package/@kaprisa57/react-popover) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/kseniya57/react-popover/badge.svg?branch=main)](https://coveralls.io/github/kseniya57/react-popover?branch=main)

- [Docs](https://kseniya57.github.io/react-popover/?path=/docs/popover--playground)
- [Playground](https://kseniya57.github.io/react-popover/?path=/story/popover--playground)

## Install

```bash
npm install --save @kaprisa57/react-popover
```

```bash
yarn add @kaprisa57/react-popover
```

### Advantages
- Fully and easily customizable. It has a bunch of props, including animation, className, arrow visibility, etc.
- Uses styled-components for styling.
- Able to change dimensions depending on available space (if maxHeight and maxWidth not specified).
- Able to choose better placement if there is no room (if guessBetterPosition = true, default false).
- Able to follow trigger (if considerTriggerMotion = true, default false for better performance).
- Able to detect trigger width and height and use them for content (useTriggerWidth, useTriggerHeight).
- Considers window resizing.
- Closes on scroll event of scroll container (if closeOnScroll = true, default true).
- Supports 12 different placements.
- Able to close on remote click, enter and escape buttons press.
- Able to open on hover, click, focus and contextMenu events. 
- Supports external visibility control (if isOpenControlled = true).
- Renders content into body or provided container.
- Supports children and content functions and provides them with some useful props.
- Accepts custom offset from default position.
- Accepts custom mouse enter/leave delay if trigger is "hover".
- Accepts custom trigger container display and tag.
- Accepts arrowSize, arrowOffset and arrowPlacement for arrow customization.
- Lazy initialization. Popover initializes on first trigger event.


### See props in [Docs](https://kseniya57.github.io/react-popover/?path=/docs/popover--playground)


### Basic Example

```jsx
import React from 'react'
import Popover from '@kaprisa57/react-popover'

function Example() {
  return <Popover content="Hi!">
    <button>Open</button>
  </Popover>
}
```

### Consider Trigger Motion
Popover can follow trigger if considerTriggerMotion = true.

See example [here](https://kseniya57.github.io/react-popover/?path=/docs/popover--drag)


### Custom styles. [Live Example](https://kseniya57.github.io/react-popover/?path=/docs/popover--styled-popover)

> Note: if you use styled-components of different version use && for styles priority

```jsx
import React from 'react'
import Popover from '@kaprisa57/react-popover'
import styled from 'styled-components'

const CustomPopover = styled(Popover)`
  background-color: aquamarine;
  border-radius: 30px;
  border: 2px solid black;
  box-shadow: none;
  &:before { // arrow
    border-left-color: black;
    border-bottom-color: black;
    box-shadow: none;
  }
`

// if you use lower version of styled-components
const CustomPopover2 = styled(Popover)`
  && {
    background-color: aquamarine;
    border-radius: 30px;
    border: 2px solid black;
    box-shadow: none;
    &:before { // arrow
    border-left-color: black;
    border-bottom-color: black;
    box-shadow: none;
    }
 }
`

export function styledPopover(props) {
  return (
      <CustomPopover {...props} content="Hi!">
        <button>Open</button>
      </CustomPopover>
  );
}
```

> Also you can use className

### Custom Animation
You can configure custom animation by defining framer-motion props. In this example used simple opacity animation, i.e. you won't see any jumping or movement. [Live Example](https://kseniya57.github.io/react-popover/?path=/docs/popover--popover-with-custom-simple-animation).

```jsx
import React from 'react'
import Popover from '@kaprisa57/react-popover'

const animation = {
  initial: {
      opacity: 0,
  },
   
 animate: {
  opacity: 1,
 },
   
   exit: {
     opacity: 0,
     transition: { duration: 0.1 },
   },
 }

function PopoverWithCustomAnimation() {
  return <Popover
      content="Hi!"
      trigger="click"
      // Popover won't move during opening
      animationTranslateDistance={0}
      // custom animation
      animation={animation}
     >
       <button>Click to Open</button>
     </Popover>
}
```

### See more details in [storybook](https://kseniya57.github.io/react-popover/?path=/docs/popover--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)