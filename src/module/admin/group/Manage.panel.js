/**
 * Manage.panel.js of pipeline
 * Created by beica on 2020/3/10
 */
import React, { useEffect, useState } from 'react'
import useRequest from 'hooks/useRequest'
import { readUser } from '../user/user.ds'

const ManagePanel = ({ coord, close, member }) => {
  const [style, update] = useState({})
  const [, readUsers] = useRequest(readUser)
  
  useEffect(() => {
    update({
      top: coord.top + 25 + 'px',
      right: document.body.clientWidth - coord.right + 'px'
    })
  }, [coord])
  
  useEffect(() => {
    readUsers({
      filter: {}
    }).catch(console.error)
  }, [readUsers])
  
  return (
    <div className="mask">
      <div className="pos-abs frosted radius padding-10" style={style} onClick={e => e.stopPropagation()}>
        <p>Manage Panel</p>
        <p>Manage Panel</p>
        <p>Manage Panel</p>
        {member.length}
        <div>
          <span className="link-btn" onClick={close}>取消</span>
        </div>
      </div>
    </div>
  )
}

export default ManagePanel
