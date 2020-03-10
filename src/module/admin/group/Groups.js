/**
 * Groups.js of pipeline
 * Created by beica on 2020/1/8
 */
import React, { memo, useEffect, useState } from 'react'
import useFetch from 'hooks/useRequest'
import Portal from 'components/Portal'
import Group from './Group'
import Edit from './Group.edit'
import { readGroups } from './group.ds'

const Align = memo(() => {
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

const Groups = () => {
  const [{ isDone, data: { groups }}, read] = useFetch(readGroups, [])
  const [isEditMode, updateEditMode] = useState(false)
  
  const done = updated => {
    if (updated) {
      read()
    }
    updateEditMode(false)
  }
  
  const add = () => {
    updateEditMode(true)
  }
  
  useEffect(() => {
    read()
  }, [read])
  
  return (
    <>
      <table>
        <Align />
        <tbody>
        <tr>
          <th>名称</th>
          <th>描述</th>
          <th>颜色</th>
          <th>组员</th>
          <th>操作</th>
        </tr>
        </tbody>
      </table>
      <table className="content">
        <Align />
        <tbody>
        {isEditMode && <Edit done={done} />}
        {isDone && groups.map(group => <Group key={group.groupId} group={group} done={done} />) }
        </tbody>
      </table>
      <Portal selector="#actions">
        <span className="link-btn" onClick={add}>新增</span>
      </Portal>
    </>
  )
}

export default Groups
