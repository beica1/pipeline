/**
 * Users.js of pipeline
 * Created by beica on 2020/1/8
 */
import React, { useState, useEffect, useCallback } from 'react'
import UserEdit from './User.edit'
import User from './User'
import useRequest from 'hooks/useRequest'
import { readAll } from './user.ds'
import Portal from 'components/Portal'

const Align = React.memo(() => {
  return (
    <colgroup>
      <col width="20%"/>
      <col width="20%"/>
      <col width="20%"/>
      <col width="20%"/>
      <col width="20%"/>
    </colgroup>
  )
})

const Users = () => {
  const [{ isDone, data: { users }}, read] = useRequest(readAll, [])
  const [isEditMode, setEditMode] = useState(false)
  
  const done = useCallback(updated => {
    if (updated) {
      read()
    }
    setEditMode(false)
  }, [read])
  
  const add = () => {
    setEditMode(true)
  }
  
  useEffect(() => {
    read()
  }, [read])
  
  return (
    <>
      <table>
        <Align/>
        <tbody>
        <tr>
          <th>用户名</th>
          <th>组</th>
          <th>角色</th>
          <th>有效期</th>
          <th>操作</th>
        </tr>
        </tbody>
      </table>
      <table className="content">
        <Align/>
        <tbody>
        {isEditMode && <UserEdit done={done} />}
        {isDone && users.map(user => (
          <User key={user.userId} done={done} user={user} />
        ))}
        </tbody>
      </table>
      <Portal selector="#actions">
        <span className="link-btn" onClick={add}>新增</span>
      </Portal>
    </>
  )
}

export default Users
