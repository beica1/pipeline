/**
 * useInterval.js of pipleline
 * Created by beica on 2019/11/19
 */
import * as R from 'ramda'
import { useRef, useEffect } from 'react'

export const useInterval = (cb, delay) => {
  const callback = useRef()
  
  useEffect(() => {
    callback.current = cb
  })
  
  useEffect(() => {
    const tick = () => callback.current()
    
    if (R.complement(R.isNil)(delay)) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])
}
