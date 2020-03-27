/**
 * User.js of pipeline
 * Created by beica on 2020/1/14
 */
import * as R from 'ramda'
import React, { useState, useCallback } from 'react'
import useRequest from 'hooks/useRequest'
import { removeUser } from './user.ds'
import Edit from './User.edit'
import { formatTime } from 'utils/date'
import config from 'config'
import { notify } from 'tools/notification'

const format = formatTime(config.dateFormat)

/**
 * 徽标button
 * @param {Object} props
 * @param {Array} props.data
 * @param {String} [props.textField='text']
 * @param {String} [props.dataField='value']
 * @param dataField
 * @returns {*}
 * @constructor
 */
const Badges = (
  {
    data = [],
    textField = 'text',
    dataField = 'value'
  }
) => {
  return data.map(item => <span className="badge margin-right-4" key={item[dataField]}>{item[textField]}</span>)
}

/**
 * 用户module
 * @param {Object} props
 * @param {Object} props.user
 * @param {String} user.name
 * @param {Array} user.groups @see {@link Groups}
 * @param {Array} user.roles @see {@link Roles}
 * @param {String} user.userId
 * @returns {*}
 * @constructor
 */
const User = ({ user, done = R.identity }) => {
  const [, drop] = useRequest(removeUser)
  const [isEdit, toggleEdit] = useState(false)
  
  const remove = userId => {
    drop({ userId }).then(() => {
      done(true)
      notify(`用户${R.prop('name', user)}已删除`)
    })
  }
  
  const edit = () => {
    toggleEdit(true)
  }
  
  const complete = useCallback(updated => {
    toggleEdit(false)
    done(updated)
  }, [done])
  
  return isEdit ? <Edit user={user} done={complete}/> : <tr>
    <td>{user.name}</td>
    <td><Badges data={user.groups} textField="name" dataField="groupId"/></td>
    <td><Badges data={user.roles} textField="name" dataField="roleId"/></td>
    <td>{format(R.propOr('永不过期', 'expiredIn', user))}</td>
    <td>
      <span className="link-btn margin-right-4" onClick={() => edit(user)}>编辑</span>
      <span className="link-btn" onClick={() => remove(user.userId)}>删除</span>
    </td>
  </tr>
}

export default User
