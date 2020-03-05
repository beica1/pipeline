/**
 * Input.js of pipleline
 * Created by beica on 2019/12/24
 */
import React, { useState, useCallback } from 'react'

const Input = ({ value: _value, update, ...props }) => {
  const [value, change] = useState(_value)
  
  const onChange = useCallback(value => {
    change(value)
    update(value)
  }, [update])
  
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value.trim())}
      {...props}
    />
  )
}

export default Input
