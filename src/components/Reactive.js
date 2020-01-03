/**
 * Reactive.js of pipleline
 * Created by beica on 2019/11/1
 */
import React from 'react'

const Reactive = ({ children,  block = false, click = () => {}, ...props }) => {
  const Wrapper = block ? 'div' : 'span'
  return (
    <Wrapper onClick={click} {...props}>
      {children}
    </Wrapper>
  )
}

export default Reactive
