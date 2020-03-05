/**
 * Delete.js of pipeline
 * Created by beica on 2020/2/26
 */
import React, { useEffect, useState } from 'react'
import Popover from 'components/Popover'
import useRequest from 'hooks/useRequest'
import { removeProcess } from './process.ds'

const Confirm = ({ done, close, coord, id }) => {
  const [, drop] = useRequest(removeProcess)
  const [style, update] = useState({})
  
  const remove = () => {
    drop({ processId: id }).then(() => {
      close()
      done(true)
    })
  }
  
  useEffect(() => {
    update({
      top: coord.top + 25 + 'px',
      right: document.body.clientWidth - coord.right + 'px'
    })
  }, [coord])
  
  return (
    <div className="mask" onClick={e => e.stopPropagation()}>
      <div className="pos-abs frosted radius black" style={style}>
        <p className="padding-8">确认删除该流程?</p>
        <div className="flex border-top text-center">
          <a className="flex-1" onClick={close}>取消</a>
          <a className="flex-1 border-left color-asst" onClick={remove}>确认</a>
        </div>
      </div>
    </div>
  )
}

const Delete = ({ done, id }) => {
  return (
    <Popover className="delete link-btn" popEl={<Confirm done={done} id={id} />}>
      删除
    </Popover>
  )
}

export default Delete
