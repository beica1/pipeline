/**
 * MultiSelect.js of pipeline
 * Created by beica on 2020/1/13
 */
import * as R from 'ramda'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import cx from 'utils/classnames'

const MultiSelect = (
  {
    data = [],
    value: _value = [],
    textField = 'text',
    dataField = 'value',
    onChange = R.identity
  }
) => {
  const input = useRef()
  const [focused, toggleFocus] = useState(false)
  const [value, updateValue] = useState(_value)
  
  const getText = useCallback(option => {
    if (R.is(String, option)) {
      return option
    }
    return R.prop(textField, option)
  }, [textField])
  
  const getValue = useCallback(option => {
    if (R.is(String, option)) {
      return option
    }
    return R.prop(dataField, option)
  }, [dataField])
  
  const toggle = () => {
    toggleFocus(!focused)
  }
  
  const blur = () => {
    toggleFocus(false)
  }
  
  const remove = useCallback((option, e) => {
    e && e.stopPropagation()
    updateValue(R.reject(R.o(R.equals(getValue(option)), getValue)))
  }, [getValue])
  
  const hasSelect = v => R.find(R.o(R.equals(getValue(v)), getValue), value)
  
  const update = option => {
    if (hasSelect(option)) {
      remove(option)
    } else {
      updateValue(pre => [...pre, option])
    }
  }
  
  useEffect(() => {
    if (focused) {
      input.current.focus()
    }
  }, [focused])
  
  useEffect(() => {
    onChange(value)
  }, [onChange, value])
  
  return (
    <span className="multi-select input" onBlur={blur} onClick={toggle}>
      <ul className="selected">
        {!value.length && <span className="color-grey">请选择</span>}
        {value.map(option => (
          <li
            key={getValue(option)}
            className="choice"
            title="点击删除"
            onClick={e => remove(option, e)}
          >
            {getText(option)}
          </li>
        ))}
        <input ref={input} type="text"/>
      </ul>
      {focused && <ul className="options radius">
        {data.map(option => (
          <li
            className={cx('option', { active: hasSelect(option) })}
            key={getValue(option)}
            onMouseDown={() => update(option)}
          >
            {getText(option)}
          </li>
        ))}
      </ul>}
    </span>
  )
}

export default MultiSelect
