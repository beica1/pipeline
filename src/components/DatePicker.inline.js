/**
 * DatePicker.inline.js of pipleline
 * Created by beica on 2019/11/15
 */
import React, { useRef, useReducer, useEffect } from 'react'
import * as R from 'ramda'
import throttle from 'lodash.throttle'
import reducerGen from 'reducers/logicReducer.gen'
import { formatTime, addDay } from 'utils/date'
import config from 'config'
import FocusedOrderList from './FocusedOrderList'

const dateReducer = reducerGen(addDay)

const InlineDatePicker = (
  {
    value: _defaultValue,
    pattern = config.dateFormat,
    change = R.identity
  }
) => {
  const [value, dispatch] = useReducer(dateReducer, _defaultValue || new Date())
  
  const pre = () => {
    dispatch({
      type: 'ADD',
      addend: -1
    })
  }
  
  const next = () => {
    dispatch({
      type: 'ADD',
      addend: 1
    })
  }
  
  const wheel = useRef(throttle(y => {
    if (y > 0 ) next()
    else pre()
  }, 200)).current
  
  const onWheel = e => {
    wheel(e.deltaY)
    e.stopPropagation()
  }
  
  const format = formatTime(pattern)
  
  useEffect(() => {
    change(value)
  }, [value, change])
  
  return (
    <div onWheel={onWheel} className="datepicker inline bg-white padding-10 radius">
      <div className="datepicker__list">
        <div className="datepicker__day pre" onClick={pre}>
          <FocusedOrderList focused={format(addDay(-1, value))} />
        </div>
        <div className="datepicker__day cur">
          <FocusedOrderList focused={format(value)} />
        </div>
        <div className="datepicker__day next" onClick={next}>
          <FocusedOrderList focused={format(addDay(1, value))} />
        </div>
      </div>
    </div>
  )
}

export default InlineDatePicker
