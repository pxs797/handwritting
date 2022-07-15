// Promise
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {

	constructor(exec) {
		exec(this.resolve, this.reject)
  }

  status = PENDING

  value = null
  reason = null

  onfulfilled = null
  onrejected = null

	resolve = (value) => {
		if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onfulfilled && this.onfulfilled(value)
    }
  }

  reject = (reason) => {
		if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onrejected && this.onrejected(reason)
    }
  }

  then(onfulfilled, onrejected) {
    if (this.status === FULFILLED) {
			onfulfilled(this.value)
    } else if (this.status === REJECTED) {
      onrejected(this.reason)
    } else if (this.status === PENDING) {
      this.onfulfilled = onfulfilled
      this.onrejected = onrejected
    }
  }

}

// test
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
		resolve('timeout')
  }, 2000)
	// resolve('success')
  // reject('error')
})
p.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
