/**
 * Form.js of pipleline
 * Created by beica on 2019/12/26
 */
import * as R from 'ramda'
import React from 'react'

const collect = R.reduce((acc, dom) => {
  const { name, value } = dom
  return name ? R.assoc(name, value, acc) : acc
}, {})

const emit = R.forEach(dom => {
  dom.dispatchEvent(new Event('change'))
})

const Form = ({ children }) => {
  const submit = e => {
    e.preventDefault()
    const fields = e.target.querySelectorAll('.form-input')
    const data = collect(fields)
    emit(fields)
    console.log(data)
  }
  
  return (
    <form onSubmit={submit}>{children}</form>
  )
}

export default Form
