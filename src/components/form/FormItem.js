/**
 * FormItem.js of pipleline
 * Created by beica on 2019/12/24
 */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import cx from 'utils/classnames'

const FormItem = (
  {
    children,
    className,
    style,
    name,
    value: _value = '',
    required = true,
    validator = v => required ? v : true,
    ...props
  }
) => {
  const [value, update] = useState(_value)
  const [isValid, changeValidState] = useState(true)
  const input = useRef()
  
  const validate = useCallback(v => {
    const result = validator(v)
    changeValidState(result)
  }, [validator])
  
  const change = useCallback(v => {
    validate(v)
    update(v)
  }, [validate])
  
  const customChange = useCallback(e => {
    validate(e.target.value)
  }, [validate])
  
  useEffect(() => {
    update(_value)
  }, [_value])
  
  useEffect(() => {
    const $input = input.current
    $input.addEventListener('change', customChange)
    
    return () => {
      $input.removeEventListener('change', customChange)
    }
  }, [customChange, validate])
  
  const nextProps = {
    value,
    update: change,
    ...props
  }
  
  return (
    <div className={cx('form-item', { invalid: !isValid }, className)} style={style}>
      {React.cloneElement(React.Children.only(children), nextProps)}
      <input
        ref={input}
        className="form-input" style={{ display: 'none' }}
        type="text" name={name} defaultValue={value}
      />
    </div>
  )
}

export default React.memo(FormItem)
