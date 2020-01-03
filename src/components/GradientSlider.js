/**
 * GradientSlider.js of pipleline
 * Created by beica on 2019/11/25
 */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import * as R from 'ramda'
import { mix as _mix } from 'utils/color'
import cx from 'utils/classnames'

const getQuoteOfPerStep = R.pipe(R.length, R.dec, R.divide(100))

const mix = R.curry((stops, percent) => {
  const start = Math.floor(percent)
  const end = Math.ceil(percent)
  return _mix(stops[start], stops[end], percent % 1)
})

const GradientSlider = ({ stops, values, value = 0, onChange = R.identity }) => {
  const quoteOfPerStep = getQuoteOfPerStep(values)
  
  const [current, change] = useState(value)
  const [color, changeColor] = useState(stops[value])
  const [left, move] = useState(value * quoteOfPerStep)
  
  const root = useRef(null)
  const cursor = useRef(null)
  
  const gradientBg = {
    background: `linear-gradient(to right, ${R.join(',', stops)})`,
    borderRadius: '4px'
  }
  
  const mixColors = mix(stops)
  
  
  const moveTo = useCallback(percent => {
    const pos = Math.round(percent / quoteOfPerStep) * quoteOfPerStep
    const color = mixColors(pos / getQuoteOfPerStep(stops))
    change(pos / quoteOfPerStep)
    changeColor(`rgba(${String(color)})`)
    move(pos)
  }, [stops, mixColors, quoteOfPerStep])
  
  const click = e => {
    const bounding = root.current.getBoundingClientRect()
    const percent = (e.clientX - bounding.x) / bounding.width * 100
    moveTo(percent)
  }
  
  useEffect(() => {
    onChange(Math.abs(current))
  }, [current, onChange])
  
  return (
    <div ref={root} className="gradient-slider" style={gradientBg} onClick={click}>
      {values.map((item, index) => {
        const style = {
          left: quoteOfPerStep * index + '%'
        }
        return <span key={index} className={cx(['stop', {active: index === current}])} style={style}>{item}</span>
      })}
      <div ref={cursor} className="cursor" style={{background: color, left: left + '%'}} />
    </div>
  )
}

export default GradientSlider
