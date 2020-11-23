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
- Able to choose better placement if there is no room (if guessBetterPosition = true).
- Able to follow trigger (if considerTriggerMotion = true, default false for better performance).
- Supports 12 different placements.
- Able to close on remote click, enter and escape buttons press.
- Able to open on hover, click, focus and contextMenu events. 
- Supports external visibility control (if isOpenControlled = true).
- Renders content into body or provided container.
- Supports children and content functions and provides them with some useful props.
- Accepts custom offset from default position.
- Accepts custom mouse enter/leave delay if trigger is "hover".
- Accepts custom trigger container display and tag.


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

### See more details in [storybook](https://kseniya57.github.io/react-popover/?path=/docs/popover--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)