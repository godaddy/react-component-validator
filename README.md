# React Component validator

Validate the instances of components that get passed as properties. 

### Install

```
npm install --save react-component-validator
```

### Usage

Use the `react-component-validator` to ensure that all components in `children` are of type `AllowedChild1` or `AllowedChild2`. The function should be added to `propTypes.children` to validate the type of children.

```js
import validateComponents from 'react-component-validator';
import React, { Component } from 'react';

class AllowedChild1 extends Component {}
class AllowedChild2 extends Component {}

class MyComponent extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

MyComponent.propTypes = {
  selected: React.PropTypes.number,
  change: React.PropTypes.func,
  children: validateComponents([AllowedChild1, AllowedChild2])
};
```

Note: Allowed children can also be passed as a string which matches the `class` name. For example, `validateComponents(['AllowedChild1', 'AllowedChild2'])`

Whenever the Component receives children of a different type an Error will be returned, which React shows as warning.

### License

See [LICENSE.md](LICENSE.md)
