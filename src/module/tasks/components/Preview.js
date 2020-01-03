/**
 * Preview.js of pipleline
 * Created by beica on 2019/11/11
 */
import React, { useState } from 'react'
import Reactive from 'components/Reactive'
import Portal from 'components/Portal'
import Content from './Preview.comp'
import './_Preview.scss'

const Preview = ({children, task, ...props}) => {
  const [show, toggle] = useState(false)
  
  return (
    <Reactive click={() => toggle(!show)} {...props}>
      {children}
      {show && <Portal><Content /></Portal>}
    </Reactive>
  )
}

export default Preview
