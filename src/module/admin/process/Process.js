/**
 * Process.js of pipeline
 * Created by beica on 2020/1/14
 */
import React, { useRef, useEffect } from 'react'
import draw from './draw'

const Process = ({ config }) => {
  const canvas = useRef()
  
  useEffect(() => {
    draw(canvas.current, config)
  }, [config])
  
  return (
    <canvas ref={canvas} />
  )
}

export default Process
