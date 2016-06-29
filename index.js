/**
 * Flatten an array of elements, probably React Components.
 *
 * @param {Array} array Entire or partial collection.
 * @returns {Array} Flattened result.
 * @api private
 */
function flatten(array) {
  if (!Array.isArray(array)) {
    array = [ array ];
  }

  return array.reduce((memo, component) => {
    if (Array.isArray(component)) {
      Array.prototype.push.apply(memo, flatten(component));
    } else if (typeof className === 'object') {
      Object.keys(component).forEach(function each(key) {
        if (Object.prototype.hasOwnProperty.call(component, key)) {
          memo.push(key);
        }
      });
    } else {
      memo.push(component);
    }

    return memo;
  }, []).filter(Boolean);
}

/**
 * Return Component name or the string identifier itself.
 *
 * @param {Component|String} component Instance or string reference.
 * @returns {String} Name of the component.
 * @api private
 */
function toString(component) {
  if (typeof component.type === 'function') {
    return component.type.name;
  }

  return component.name || component;
}

/**
 * Check if the Component is allowed.
 *
 * @param {Array} components Allowed components.
 * @param {Component} component React Component.
 * @returns {Boolean} Result of the check.
 * @api private
 */
function allowed(components) {
  return component => {
    return !!(
      ~components.indexOf(component) ||
      ~components.indexOf(component.type) ||
      ~components.indexOf(toString(component)));
  }
}

/**
 * Create a new validator that allows the provided React Components.
 *
 * @param {Array} instances Collection of classes or strings.
 * @returns {null|error} Returns null if Component is allowed, otherwise an error.
 * @api public
 */
export default function validateComponents(components = []) {
  if (!Array.isArray(components)) {
    components = [ components ];
  }

  return function allowComponents(props, propName, componentName) {
    const prop = flatten(props[propName]);

    if (prop.every(allowed(components))) {
      return null;
    }

    return new Error(
      `${componentName} may only receive Components of type: ${components.map(toString).join(', ')} on property ${propName}.`
    );
  }
}