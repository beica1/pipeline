/**
 * SwitchButton.js of pipleline
 * Created by beica on 2020/1/7
 */
import * as R from 'ramda'
import React, { useState, useEffect } from 'react'
import cx from 'utils/classnames'

const SwitchButton = ({ switches, value: _value = switches[0], change = R.identity }) => {
  const [cur , update] = useState(_value)
  
  useEffect(() => {
    change(cur)
  }, [change, cur])
  
  return (
    <span className="switch-btn inline-middle">
      <div className="switches flex-inter-center">
        {switches.map(item => (
          <span
            className={cx('switch flex-1', {active: item.value === cur.value})}
            key={item.value}
            onClick={() => update(item)}
          >{item.label}</span>
        ))}
      </div>
      <div className="cursor" />
    </span>
  )
}

export default SwitchButton
