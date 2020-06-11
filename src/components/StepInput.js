/**
 * StepInput.js of pipleline
 * Created by beica on 2019/11/22
 */
import React from 'react'
import * as R from 'ramda'
import reducerGen from 'reducers/logicReducer.gen'


const StepInput = (
  {
    value: _value = 0,
    step,
    format = R.identity,
    max = Infinity,
    min = -Infinity,
    change = R.identity
  }
) => {
  const stepReducer = reducerGen(R.add)
  const [value, dispatch] = React.useReducer(stepReducer, _value)
  
  const update = addend => {
    dispatch({
      type: 'ADD',
      addend
    })
    change(value + addend)
  }
  
  const inc = () => {
    const next = value + step > max ? (max - value) : step
    update(next)
  }
  
  const dec = () => {
    const next = -(value - step < min ? value - min : step)
    update(next)
  }
  
  return (
    <span className="step-input">
      <input type="text" readOnly={true} value={format(value)}/>
      <span className="action" onClick={inc}>△</span>
      <span className="action" onClick={dec}>▽</span>
    </span>
  )
}

export default StepInput
