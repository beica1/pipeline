/**
 * Popover.js of pipleline
 * Created by beica on 2019/11/11
 */
import * as R from 'ramda'
import React, { useState } from 'react'
import Reactive from './Reactive'
import Portal from './Portal'

const Popover = ({ children, popup, open = R.identity, ...props }) => {
  
  const [show, toggle] = useState(false)
  
  const emit = open
  
  const toggleDisplay = (e) => {
    const bounding = e.currentTarget.getBoundingClientRect()
    R.when(R.not, R.thunkify(emit)(bounding))(show)
    toggle(!show)
  }
  
  return (
    <Reactive {...props} click={toggleDisplay}>
      {children}
      {show && <Portal>{popup}</Portal>}
    </Reactive>
  )
}

export default Popover
