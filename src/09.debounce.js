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
function fn (param) {
  console.log(param);
}
let deb = debounce(fn, 2000)
deb('Hello World')
setTimeout(() => {
  deb('Hello World')
}, 1000);
