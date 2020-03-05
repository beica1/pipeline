/**
 * Date: 2019/3/21
 * Author: beicai
 * Description: store
 * @warn __IMPURE__
 */
import * as R from 'ramda'

const setObjectValue = R.curry((o, k, v) => {
  o[k] = v
})

const setValues = o => {
  const _setValue = setObjectValue(o)
  const _set = R.apply(_setValue)
  return R.unapply(R.ifElse(R.propEq('length', 1), R.o(R.map(_set), R.unnest), _set))
}

export const createStore = (key, initialValue) => {
  const store = {}
  
  const getValue = R.flip(R.prop)(store)
  
  const set = setValues(store)
  
  if (key) {
    store[key] = initialValue

    return Object.freeze({
      get: R.thunkify(getValue)(key),
      set: R.partial(set, [key])
    })
  }
  
  const get = R.ifElse(R.is(Array), R.map(getValue), getValue)
  return Object.freeze({ get, set })
}

export const store = obj => {
  const set = setValues(obj)
  return Object.freeze({
    get () { return obj },
    set
  })
}
