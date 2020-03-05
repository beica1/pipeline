/**
 * Submit.js of pipeline
 * Created by beica on 2020/2/25
 */
import React, { useState, useEffect } from 'react'
import Popover from 'components/Popover'
import useRequest from 'hooks/useRequest'
import { addProcess } from './process.ds'
import { getValue } from './draw.edit'

const Confirm = ({ coord, close, done }) => {
  const [style, update] = useState({})
  const [name, setName] = useState('')
  const [, create] = useRequest(addProcess)
  
  const submit = () => {
    const process = {
      phases: getValue(),
      name
    }
    create({ process }).then(() => {
      close()
      done(true)
    }).catch(console.error)
  }
  
  useEffect(() => {
    update({
      top: coord.top + 25 + 'px',
      right: document.body.clientWidth - coord.right + 'px'
    })
  }, [coord])
  
  return (
    <div className="mask">
      <div className="pos-abs frosted radius over-hidden black" onClick={e => e.stopPropagation()} style={style}>
        <input type="text" placeholder="请输入流程名称" onChange={e => setName(e.target.value.trim())} />
        <button className="btn" onClick={submit}>确认并提交</button>
      </div>
    </div>
  )
}

const Create = ({ done }) => {
  return (
    <Popover className="link-btn margin-left-4" popEl={<Confirm done={done} />}>
      提交
    </Popover>
  )
}

export default Create
