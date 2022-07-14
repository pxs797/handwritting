// new操作符
function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

// test
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.getPersonInfo = function() {
  console.log(`My name is ${this.name}, i am ${this.age}!`)
}
let person = myNew(Person, 'Mark', 23)
console.log(person);
person.getPersonInfo()
