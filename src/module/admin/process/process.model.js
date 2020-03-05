/**
 * process.model.js of pipeline
 * Created by beica on 2020/2/5
 */
import * as R from 'ramda'
import { createStore } from 'utils/store'

const INITIAL_VALUE = [[]]

const { get, set } = createStore('process', INITIAL_VALUE)

const updateArray = (index, item, array) => {
  let arr = array
  const delta = index - arr.length + 1
  if (delta > 0) {
    arr = R.concat(arr, R.repeat(undefined, delta))
  }
  return R.update(index, item, arr)
}


export const push = (index, item) => {
  const array = get()
  const col = R.propOr([], index, array)
  const updatedCol = R.append(item, col)
  const updatedArr = updateArray(index, updatedCol, array)
  set(updatedArr)
}

export const remove = (index, item) => {
  const array = get()
  const col = R.nth(index, array)
  const updatedCol = R.reject(R.equals(item), col)
  const updatedArray = R.update(index, updatedCol, array)
  set(updatedArray)
}

export const getValue = () => {
  const array = get()
  return R.reject(R.isEmpty, array)
}

export const reset = () => {
  set(INITIAL_VALUE)
}
