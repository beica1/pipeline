/**
 * User.js of pipleline
 * Created by beica on 2020/1/7
 */
import * as R from 'ramda'
import React, { useState, useEffect } from 'react'
import useRequest from 'hooks/useRequest'
import { addQuery, updateUser } from './user.ds'
import useInput from 'hooks/useInput'
import MultiSelect from 'components/form/MultiSelect'
import { queryRoles, queryGroups } from './user.ds'
import { formatTime } from 'utils/date'
import config from 'config'

const format = formatTime(config.dateFormat)

const UserEdit = ({ done = R.identity, user = {} }) => {
  const [, create] = useRequest(addQuery)
  const [, update] = useRequest(updateUser)
  const [{ data: { roles: roleData } }, readRoles] = useRequest(queryRoles, [])
  const [{ data: { groups: groupData } }, readGroups] = useRequest(queryGroups, [])
  const [name, Name] = useInput({ placeholder: '请输入用户名', value: R.propOr('', 'name', user) })
  const [roles, updateRoles] = useState(R.propOr([], 'roles', user))
  const [groups, updateGroups] = useState(R.propOr([], 'groups', user))
  const [expiredIn, Expired] = useInput({
    placeholder: '请设置有效期',
    value: format(R.propOr('', 'expiredIn', user)),
    type: 'date'
  })
  
  const submit = () => {
    const request  = user.userId ? update : create
    const data = {
      userId: user.userId,
      user: { name, roles, groups, expiredIn }
    }
    request(data).then(() => done(true))
  }
  
  useEffect(() => {
    readRoles().catch(() => {
      alert('角色数据获取失败')
    })
  }, [])
  
  useEffect(() => {
    readGroups().catch(() => {
      alert('分组数据获取失败')
    })
  }, [])
  
  return (
    <tr className="user">
      <td>{Name}</td>
      <td>
        <MultiSelect
          value={groups}
          data={groupData} onChange={updateGroups}
          textField="name" dataField="groupId"
        />
      </td>
      <td>
        <MultiSelect
          value={roles}
          data={roleData} onChange={updateRoles}
          textField="name" dataField="roleId"
        />
      </td>
      <td>{Expired}</td>
      <td>
        <span className="link-btn" onClick={submit}>提交</span>
        <span className="link-btn margin-left-4" onClick={() => done()}>取消</span>
      </td>
    </tr>
  )
}

export default UserEdit
