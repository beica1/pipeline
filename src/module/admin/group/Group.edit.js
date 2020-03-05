/**
 * Group.edit.js of pipeline
 * Created by beica on 2020/1/14
 */
import * as R from 'ramda'
import React, { useCallback } from 'react'
import useInput from 'hooks/useInput'
import usePost from 'hooks/useRequest'
import { createGroup } from './group.ds'

const GroupEdit = ({ group = {}, done = R.identity }) => {
  const [, create] = usePost(createGroup)
  const [name, Name] = useInput({ placeholder: '请输入名称' })
  const [desc, Desc] = useInput({ placeholder: '请输入描述' })
  const [color, Color] = useInput({ placeholder: '请选择颜色', type: 'color' })
  const [, Member] = useInput({ placeholder: '请选择组员' })
  
  const update = useCallback(() => {}, [])
  
  const add = useCallback(() => {
    return create({
      group: { name, desc, color }
    })
  }, [color, create, desc, name])
  
  const submit = useCallback(() => {
    const request = group && group.groupId ? update : add
    request().then(() => done(true))
  }, [add, done, group, update])
  
  return (
    <tr>
      <td>{Name}</td>
      <td>{Desc}</td>
      <td>{Color}</td>
      <td>{Member}</td>
      <td>
        <span className="link-btn margin-right-4" onClick={submit}>提交</span>
        <span className="link-btn" onClick={() => done(false)}>取消</span>
      </td>
    </tr>
  )
}

export default GroupEdit
