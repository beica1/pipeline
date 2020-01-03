/**
 * Input.js of pipleline
 * Created by beica on 2019/12/24
 */
import React from 'react'

const Input = ({ value, update, ...props }) => {
  return <input type="text" value={value} {...props} onChange={e => update(e.target.value)} />
}

export default Input
