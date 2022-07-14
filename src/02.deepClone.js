// JSON实现深拷贝
JSON.parse(JSON.stringify({}))

// 递归实现深拷贝
function deepClone(value) {
  if (typeof value != 'object' && typeof value != 'array') {
    return value
  }
  let res = value.constructor == Array ? [] : {}
  if (typeof value == 'object') {
    for (const key in value) {
      res[key] = deepClone(value[key])
    }
    return res
  }
}

// test
let person = {
  name: 'Mark',
  age: 23,
  hobbies: ['eat', 'sleep', 'play'],
  todoList: {
    first: 'code',
    second: 'eat',
    third: 'sleep',
  },
}
console.log('person: ', person)
console.log("--------");
let person2 = deepClone(person)
// let person2 = JSON.parse(JSON.stringify(person))
person2.name = 'Mars'
person2.hobbies.push('code')
person2.todoList.third = 'drive'
person2.todoList.fourth = 'sleep'
console.log('person: ', person);
console.log("--------")
console.log('person2: ', person2);
