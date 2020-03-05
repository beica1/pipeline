/**
 * Group.js of pipeline
 * Created by beica on 2020/1/8
 */
import React from 'react'
import { removeGroup } from './group.ds'
import usePost from 'hooks/useRequest'
import { notify } from 'tools/notification'
import Manage from './Manage'

const Group = ({ group = {}, done }) => {
  const [, drop] = usePost(removeGroup)
  
  const remove = groupId => {
    drop({ groupId }).then(() => {
      notify('Group removed')
      done(true)
    })
  }
  
  return (
    <tr>
      <td>{group.name}</td>
      <td>{group.desc}</td>
      <td>
        <input type="color" value={group.color} readOnly disabled />
      </td>
      <td>
        <Manage member={group.member} />
      </td>
      <td>
        <span className="link-btn" onClick={() => remove(group.groupId)}>删除</span>
      </td>
    </tr>
    )
  
}

export default Group
