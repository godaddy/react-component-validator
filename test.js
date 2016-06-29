import assume from 'assume';
import validateComponents from './';

class MockComponentOne {}
class MockComponentTwo {}
class MockComponentDisallowed {}

/**
 * Mimic the properties that get passed to a React component.
 *
 * @param {Mixed} children Set of components.
 * @returns {Array} arguments that can be spread on validator.
 * @api private
 */
function props(children) {
  return [{
    children
  }, 'children', 'Test'];
}

describe('React Component validator', () => {
  it('returns a validate function', () => {
    assume(validateComponents()).to.be.an('function');
  });

  it('accepts one or many instances', () => {
    assume(validateComponents(MockComponentOne)(
      ...props([ MockComponentOne ])
    )).to.equal(null);

    assume(validateComponents([MockComponentOne, MockComponentTwo])(
      ...props(MockComponentTwo)
    )).to.equal(null);
  });

  it('will return an error if the component is not allowed', () => {
    const result = validateComponents([MockComponentOne, MockComponentTwo])(
      ...props(MockComponentDisallowed)
    );

    assume(result).to.be.an('Error');
    assume(result.message).to.include('Test may only receive Components of type');
    assume(result.message).to.include('MockComponentOne, MockComponentTwo');
    assume(result.message).to.include('on property children');
  });

  it('will flatten the passed components', () => {
    assume(validateComponents([ MockComponentOne, MockComponentTwo ])(
      ...props([MockComponentOne, [ MockComponentTwo ]])
    )).to.equal(null);
  });
});