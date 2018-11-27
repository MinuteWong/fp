const _ = require("lodash")
const ramda = require("ramda")
const curry = ramda.curry
const compose = ramda.compose

class Container {
  constructor(value) {
    this.__value = value
  }

  static of(value) {
    return new Container(x)
  }

  map(f) {
    return Container.of(f(this.__value))
  }
}

class Maybe {
  constructor(value) {
    this.__value = value
  }

  static of(value) {
    return new Maybe(value)
  }

  isNothing() {
    return this.__value === null || this.__value === undefined
  }

  map(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
  }
}

const map = curry((f, functor) => {
  return functor.map(f)
})

const safeHead = xs => Maybe.of(xs[0])
const streetName = compose(
  map(_.property("street")),
  safeHead,
  _.property("addresses")
)

console.log(streetName({ addresses: [] }))

console.log(streetName({ addresses: [{ street: "Shady Ln.", number: 4201 }] }))

const withdraw = curry((amount, account) => {
  return account.balance >= amount
    ? Maybe.of({ balance: account.balance - account })
    : Maybe.of(null)
})
