// debounce
function debounce(fn, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay);
  }
}

// test
function fn () {
  console.log('Hello World');
}
let test = debounce(fn, 2000)
test()
setTimeout(() => {
  test()
}, 1000);
