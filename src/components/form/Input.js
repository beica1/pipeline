/**
 * Input.js of pipleline
 * Created by beica on 2019/12/24
 */
import React from 'react'
import { useField } from 'formik'

const Input = (props) => {
  const [field] = useField(props)
  console.log(field)
  
  return (
    <input
      type="text"
      {...field}
      {...props}
    />
  )
}

export default Input
