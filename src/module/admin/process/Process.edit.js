/**
 * Process.edit.js of pipeline
 * Created by beica on 2020/1/15
 */
import * as R from 'ramda'
import React, { useRef, useEffect } from 'react'
import { draw } from './draw.edit'
import Portal from 'components/Portal'
import useRequest from 'hooks/useRequest'
import Create from './Create'
import { readGroups } from '../group/group.ds'

const ProcessEdit = ({ done = R.identity }) => {
  const [{ isDone, data: { groups }}, read] = useRequest(readGroups, [])
  const canvas = useRef()
  
  useEffect(() => {
    if (isDone) {
      draw(canvas.current, groups, done)
    }
  }, [isDone, done, groups])
  
  useEffect(() => {
    read()
  }, [read])
  
  return (
    <>
      <canvas ref={canvas} />
      <Portal selector="#actions">
        <span className="link-btn" onClick={() => done()}>取消</span>
        <Create done={done} />
      </Portal>
    </>
  )
}

export default ProcessEdit
