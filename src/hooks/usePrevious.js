/**
 * usePrevious.js of pipleline
 * Created by beica on 2019/11/22
 */
import { useRef, useEffect } from 'react'

const usePrevious = value => {
  const ref = useRef()
  
  useEffect(() => {
    ref.current = value
  })
  
  return ref.current
}

export default usePrevious
