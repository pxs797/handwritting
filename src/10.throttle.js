// throttle
function throttle(fn, delay) {
  let startTime = 0
  return function () {
    let lastTime = Date.now()
    if (lastTime - startTime > delay) {
      fn()
      startTime = lastTime
    }
  }
}

//test
function fn() {
  console.log('Hello World');
}
let test = throttle(fn, 2000)

test()
setTimeout(() => {
  test()
}, 500);
setTimeout(() => {
  test()
}, 1000);
setTimeout(() => {
  test()
}, 2000);