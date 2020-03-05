/**
 * Manage.js of pipeline
 * Created by beica on 2020/3/5
 */
import React, { useState, useEffect } from 'react'
import Popover from 'components/Popover'
import useRequest from 'hooks/useRequest'

const Panel = ({ coord, close, member }) => {
  const [style, update] = useState({})
  const [, readUsers] = useRequest
  
  useEffect(() => {
    update({
      top: coord.top + 25 + 'px',
      right: document.body.clientWidth - coord.right + 'px'
    })
  }, [coord])
  
  return (
    <div className="mask">
      <div className="pos-abs frosted radius padding-10" style={style} onClick={e => e.stopPropagation()}>
        <p>Manage Panel</p>
        <p>Manage Panel</p>
        <p>Manage Panel</p>
        <div>
          <span className="link-btn" onClick={close}>取消</span>
        </div>
      </div>
    </div>
  )
}

const Manage = ({ member }) => {
  return (
    <Popover className="link-btn" popEl={<Panel member={member} />}>
      管理({member.length})
    </Popover>
  )
}

export default Manage
