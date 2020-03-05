/**
 * Process.js of pipeline
 * Created by beica on 2020/1/8
 */
import React, { useState, useCallback, useEffect } from 'react'
import Portal from 'components/Portal'
import useRequest from 'hooks/useRequest'
import { readProcesses } from './process.ds'
import Process from './Process'
import Edit from './Process.edit'
import Delete from './Delete'

const Processes = () => {
  const [isEdit, updateEditMode] = useState(false)
  const [{ isDone, data: { processes }}, read] = useRequest(readProcesses, [])
  
  const add = updated => {
    updateEditMode(true)
  }
  
  const done = useCallback(updated => {
    if (updated) {
      read()
    }
  
    updateEditMode(false)
  }, [])
  
  
  useEffect(() => {
    read()
  }, [])
  
  return (
    <>
      <ul>
        <li className="process">
          {isEdit && <Edit done={done} />}
        </li>
        {isDone &&
          processes.map(item => (
            <li key={item.processId} className="process">
              <Process config={item} />
              <Delete id={item.processId} done={done} />
            </li>
          ))
        }
      </ul>
      {!isEdit &&
        <Portal selector="#actions">
          <span className="link-btn" onClick={add}>新增流程</span>
        </Portal>
      }
    </>
  )
}

export default Processes
