/**
 * @description useArray.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/18>
 */
import * as R from 'ramda'
import { useState, useCallback } from 'react'

const useArray = () => {
  const [array, update] = useState([])
  
  /**
   * @param {*}
   * @function
   */
  const push = useCallback(R.o(update, R.append), [])
  
  /**
   * @function
   */
  const pop = useCallback(R.o(update, R.init), [])
  
  /**
   * @param {*}
   * @function
   */
  const unshift = useCallback(R.o(update, R.prepend), [])
  
  /**
   * @function
   */
  const shift = useCallback(R.o(update, R.tail), [])
  
  /**
   * @param {Function}
   * @function
   */
  const remove = useCallback(R.o(update, R.reject), [])
  
  return [array, { push, pop, unshift, shift, remove}]
}

export default useArray
