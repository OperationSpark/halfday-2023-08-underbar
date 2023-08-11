var clock;

mocha.setup('bdd');
window.expect = chai.expect;

before(function() {
  clock = sinon.useFakeTimers();

  sinon.spy(Array.prototype, 'map');
  sinon.spy(Array.prototype, 'indexOf');
  sinon.spy(Array.prototype, 'forEach');
  sinon.spy(Array.prototype, 'filter');
  sinon.spy(Array.prototype, 'reduce');
  sinon.spy(Array.prototype, 'every');
  sinon.spy(Array.prototype, 'some');
});

beforeEach(function() {
  Array.prototype.map.reset();
  Array.prototype.indexOf.reset();
  Array.prototype.forEach.reset();
  Array.prototype.filter.reset();
  Array.prototype.reduce.reset();
  Array.prototype.every.reset();
  Array.prototype.some.reset();
});

after(function() {
  clock.restore();

  Array.prototype.map.restore();
  Array.prototype.indexOf.restore();
  Array.prototype.forEach.restore();
  Array.prototype.filter.restore();
  Array.prototype.reduce.restore();
  Array.prototype.every.restore();
  Array.prototype.some.restore();
});

function checkForNativeMethods(runUnderbarFunction) {
  it('should not use the native version of any underbar methods in its implementation', function() {
    runUnderbarFunction();
    sinon.assert.notCalled(Array.prototype.map);
    sinon.assert.notCalled(Array.prototype.indexOf);
    sinon.assert.notCalled(Array.prototype.forEach);
    sinon.assert.notCalled(Array.prototype.filter);
    sinon.assert.notCalled(Array.prototype.reduce);
    sinon.assert.notCalled(Array.prototype.every);
    sinon.assert.notCalled(Array.prototype.some);
  });
}
