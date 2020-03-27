/**
 * Groups.js of pipeline
 * Created by beica on 2020/1/8
 */
import React, { useEffect, useState } from 'react'
import useFetch from 'hooks/useRequest'
import Portal from 'components/Portal'
import Group from './Group'
import Edit from './Group.edit'
import { readGroups } from './group.ds'
import useTableHeader from 'hooks/useTableHeader'

const groupHeader = [
  {
    title: '名称', width: 20},{
    title: '描述', width: 20},{
    title: '颜色', width: 20},{
    title: '组员', width: 20},{
    title: '操作', width: 20
  }
]

const Groups = () => {
  const [{ isDone, data: { groups }}, read] = useFetch(readGroups, [])
  const [isEditMode, updateEditMode] = useState(false)
  const [Align, Header] = useTableHeader(groupHeader)
  
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
  
  return <>
    <table>
      <Align/>
      <tbody>
      <Header/>
      </tbody>
    </table>
    <table className="content">
      <Align/>
      <tbody>
      {isEditMode && <Edit done={done}/>}
      {isDone && groups.map(group => <Group key={group.groupId} group={group} done={done}/>)}
      </tbody>
    </table>
    <Portal selector="#actions">
      <span className="link-btn" onClick={add}>新增</span>
    </Portal>
  </>
}

export default Groups
