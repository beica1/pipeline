/**
 * DatePicker.inline.js of pipleline
 * Created by beica on 2019/11/15
 */
import React from 'react'
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
    pattern = config.timeFormat,
    change = R.identity
  }
) => {
  const [value, dispatch] = React.useReducer(dateReducer, _defaultValue || new Date())
  
  const update = (addend, val) => {
    dispatch({
      type: 'ADD',
      addend
    })
    change(addDay(addend, val || value))
  }
  
  const wheel = React.useRef(throttle((y, value) => {
    if (y > 0 ) update(1, value)
  else update(-1, value)
  }, 250)).current
  
  const onWheel = e => {
    wheel(e.deltaY, value)
    e.stopPropagation()
  }
  
  const format = formatTime(pattern)
  
  return (
    <div onWheel={onWheel} className="datepicker inline radius">
      <div className="datepicker__list">
        <div className="datepicker__day pre" onClick={() => update(-1)}>
          <FocusedOrderList focused={format(addDay(-1, value))} />
        </div>
        <div className="datepicker__day cur">
          <FocusedOrderList focused={format(value)} />
        </div>
        <div className="datepicker__day next" onClick={() => update(1)}>
          <FocusedOrderList focused={format(addDay(1, value))} />
        </div>
      </div>
    </div>
  )
}

export default InlineDatePicker
