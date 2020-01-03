/**
 * StepInput.js of pipleline
 * Created by beica on 2019/11/22
 */
import React, { useReducer, useEffect } from 'react'
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
  const [value, dispatch] = useReducer(stepReducer, _value)
  
  const inc = () => {
    dispatch({
      type: 'ADD',
      addend: value + step > max ? max - value : step
    })
  }
  
  const dec = () => {
    dispatch({
      type: 'ADD',
      addend: -(value - step < min ? value - min : step)
    })
  }
  
  useEffect(() => {
    change(value)
  }, [value, min, change])
  
  return (
    <span className="step-input">
      <input type="text" readOnly={true} value={format(value)}/>
      <span className="action" onClick={inc}>△</span>
      <span className="action" onClick={dec}>▽</span>
    </span>
  )
}

export default StepInput
