/**
 * Roles.js of pipeline
 * Created by beica on 2020/1/8
 */
import React, { useState, useEffect } from 'react'
import { readQuery } from './role.ds'
import useRequest from 'hooks/useRequest'

const Align = React.memo(() => {
  return (
    <colgroup>
      <col width="40%" />
      <col width="40%" />
      <col />
    </colgroup>
  )
})

const Roles = () => {
  const [query] = useState(readQuery)
  const [{ isDone, data: {roles}}, read] = useRequest(query, [])
  
  useEffect(() => {
    read()
  }, [read])
  
  return (
    <>
      <table>
        <Align />
        <tbody>
        <tr>
          <th>角色名称</th>
          <th>描述</th>
          <th>操作</th>
        </tr>
        </tbody>
      </table>
      <table className="content">
        <Align />
        <tbody>
        {isDone && roles.map(item => (
          <tr key={item.roleId}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td><span className="link-btn">删除</span></td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Roles
