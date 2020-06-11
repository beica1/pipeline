/**
 * Input.js of pipleline
 * Created by beica on 2019/12/24
 */
import React from 'react'

const Input = ({ onChange, value, ...props }) => <input type="text" {...props} onChange={e => onChange(e.target.value)} />

export default Input
