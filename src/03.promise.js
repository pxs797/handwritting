// Promise
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise, p, resolve, reject) {
  if (promise === p) {
    return reject(new TypeError("self promise"))
  }
  if (p instanceof MyPromise) {
    p.then(resolve, reject)
  } else {
    resolve(p)
  }
}

class MyPromise {
  constructor(exec) {
    exec(this.resolve, this.reject)
  }

  status = PENDING

  value = null
  reason = null

  onfulfilledCallbacks = []
  onrejectedCallbacks = []

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while (this.onfulfilledCallbacks.length) {
        this.onfulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.onrejectedCallbacks.length) {
        this.onrejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onfulfilled, onrejected) {
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          const p = onfulfilled(this.value)
          resolvePromise(promise, p, resolve, reject)
        })
      } else if (this.status === REJECTED) {
        onrejected(this.reason)
      } else if (this.status === PENDING) {
        this.onfulfilledCallbacks.push(onfulfilled)
        this.onrejectedCallbacks.push(onrejected)
      }
    })
    return promise
  }
}

// test
function otherPromise() {
  return new MyPromise((resolve, reject) => {
    resolve('other promise resolve')
  })
}
let p = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('timeout')
  // }, 2000)
  resolve('success')
  // reject('error')
})
// let p2 = p.then((res) => {
//   console.log(res)
//   return p2
// })
// p2.then(res => {
//   console.log(rs);
// }, reason => {
//   console.log(reason);
// })
p.then((res) => {
  console.log(res)
  return otherPromise()
}).then((res) => {
  console.log(res)
})
