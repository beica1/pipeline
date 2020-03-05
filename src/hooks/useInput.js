/**
 * useInput.js of pipeline
 * Created by beica on 2020/1/10
 */
import React, { useState } from 'react'

const useInput = ({ value: _value, ...props } = {}) => {
  const [value, update] = useState(_value || '')
  
  const El =
    <input
      type="text"
      value={value}
      onChange={e => update(e.target.value.trim())}
      {...props}
    />
  
  return [value, El]
  
}

export default useInput
