// 1
const getNewObjWithPrototype = (obj) => {
    return Object.create(obj)
}

// 2
const getEmptyObj = () => {
    return Object.create(null)
}

// 3
const setPrototypeChain = ({programmer, student, teacher, person}) => {
    return Object.setPrototypeOf(programmer, Object.setPrototypeOf(student, Object.setPrototypeOf(teacher, person)))
}

// 4
const getObjWithEnumerableProperty = () => {
    let obj = {
        name: 'Alex',
        age: 18,
        work: 'empty'
    }
    Object.defineProperty(obj, 'age', {enumerable: true})
    Object.defineProperty(obj, 'name', {enumerable: false})
    Object.defineProperty(obj, 'work', {enumerable: false})
    return obj
}

// 5
const getWelcomeObject = (person) => {
    return Object.create(person, {
        voice: {
            value: function () {
                return `Hello, my name is ${this.name}. I am ${this.age}.`
            }
        }
    })
}

// 6
class Singleton {
    constructor(id) {
        if (Singleton.instance) {
            return Singleton.instance
        }
        this.id = id;
        Singleton.instance = this
    }
}

// 7
const defineTimes = () => {
    Object.defineProperty(Number.prototype, 'times', {
        value: function (callback) {
            const value = Number(this)
            for (let i = 1; i <= value; i++) {
                callback(i, value)
            }
        }
    })
}

// 8
const defineUniq = () => {
    Object.defineProperty(Array.prototype, 'uniq', {
        get: function () {
            return [...new Set(this)]
        }
    })
}

// 9
const defineUniqSelf = () => {
    Object.defineProperty(Array.prototype, 'uniqSelf', {
        get: function () {
            const uniqueValues = [...new Set(this)]
            this.splice(0, this.length, ...uniqueValues)
            return this
        },
    })
}

module.exports = {
    getNewObjWithPrototype,
    getEmptyObj,
    setPrototypeChain,
    getObjWithEnumerableProperty,
    getWelcomeObject,
    Singleton,
    defineTimes,
    defineUniq,
    defineUniqSelf,
}
// defineUniqSelf();
// const arr = [1, 2, 2];

// console.log(arr.uniqSelf); // [1,2];
// console.log(arr); // [1,2];
