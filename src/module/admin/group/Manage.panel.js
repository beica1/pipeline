/**
 * Manage.panel.js of pipeline
 * Created by beica on 2020/3/10
 */
import * as R from 'ramda'
import React, { useEffect, useState, useCallback } from 'react'
import useRequest from 'hooks/useRequest'
import cx from 'utils/classnames'
import './Manage.panel.scss'
import TagSelect from 'components/TagSelect'
import { readUser } from '../user/user.ds'
import { readQuery as readRole } from '../role/role.ds'

const defaultTags = [
  {
    label: '当前',
    value: 0,
    checked: true
  },
  {
    label: '所有',
    value: -1
  }
]

/**
 * 用户管理面板
 * @param {DOMRect} coord
 * @param {Array} member
 * @param {String} member[].userId
 * @param {String} member[].name
 * @returns {*}
 * @constructor
 */
const ManagePanel = ({ coord, member }) => {
  const [style, updatePos] = useState({})
  const [{isDone, data: { users }}, readUsers] = useRequest(readUser, [])
  const [{data: { roles }}, readRoles] = useRequest(readRole, {roles: []})
  const [selected, cache] = useState([])
  const [tags, setTags] = useState(defaultTags)
  
  const readAll = useCallback(() => readUsers('用户', {filter: {}}), [readUsers])
  
  const isAdded = useCallback(R.flip(R.includes)(selected), [selected])
  
  const toggle = (userId, added) => {
    const updated = added ? R.reject(R.equals(userId), selected) : R.append(userId, selected)
    cache(updated)
  }
  
  const filter = value => {
    console.log(value)
  }
  
  // 更新弹出窗口的位置信息
  useEffect(() => {
    updatePos({
      top: coord.top + 25 + 'px',
      right: document.body.clientWidth - coord.right + 'px'
    })
  }, [coord])
  
  // 读取所有用户信息 读取角色信息
  useEffect(() => {
    readAll().catch(console.error)
    readRoles().catch(console.error)
  }, [readAll, readRoles])
  
  useEffect(() => {
    const format = R.applySpec({
      value: R.prop('roleId'),
      label: R.prop('name')
    })
    setTags(R.flip(R.concat)(R.map(format, roles)))
  }, [roles])
  
  // 缓存已经在组内的用户
  useEffect(() => {
    cache(R.pluck('userId', member))
  }, [member])
  
  // 减少不必要的渲染
  const Tags = React.useMemo(() => <TagSelect tags={tags} type="radio" onChange={filter}/>, [tags])
  
  return <div className="mask">
    <div
      className="user__panel pos-abs frosted black radius padding-10"
      style={style} onClick={e => e.stopPropagation()}
    >
      {Tags}
      <ul className="user__list flex border-top margin-top-12">
        {isDone && users.map(user => {
          const added = isAdded(user.userId)
          return <li
            key={user.userId}
            className={cx('user', { added }, 'flex-1')}
            onClick={() => toggle(user.userId, added)}
          >
            {user.name}
          </li>
        })}
      </ul>
    </div>
  </div>
}

export default ManagePanel
