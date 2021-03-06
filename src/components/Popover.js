/**
 * Popover.js of pipleline
 * Created by beica on 2019/11/11
 */
import React, { useState, useLayoutEffect, useRef } from 'react'
import Portal from './Portal'

const Null = () => <span />

const Popover = ({ children, popEl = <Null />, ...props }) => {
  const root = useRef()
  const [show, toggle] = useState(false)
  const [position, updatePos] = useState({})
  
  useLayoutEffect(() => {
    updatePos(root.current.getBoundingClientRect())
  }, [])
  
  return (
    <span className="popover" ref={root} {...props} onClick={() => toggle(!show)}>
      {children}
      {
        show &&
        <Portal className="popover">
          {React.cloneElement(popEl, {
            close: () => toggle(false),
            coord: position
          })}
        </Portal>
      }
    </span>
  )
}

export default Popover
