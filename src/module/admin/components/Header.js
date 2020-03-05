/**
 * Header.js of pipleline
 * Created by beica on 2020/1/7
 */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SwitchButton from 'components/SwitchButton'

const switches = [
  {
    label: '用户',
    value: 0,
    path: '/admin'
  },
  {
    label: '组',
    value: 2,
    path: '/admin/group'
  },
  {
    label: '流程',
    value: 3,
    path: '/admin/process'
  },
  {
    label: '角色',
    value: 1,
    path: '/admin/role'
  }
]

const Header = () => {
  const [type, update] = useState(switches[0])
  const history = useHistory()
  
  const change = v => {
    update(v)
  }
  
  useEffect(() => {
    history.push(type.path)
  }, [history, type])
  
  return (
    <header className="flex">
      <div className="flex-1">
        <SwitchButton switches={switches} change={change} />
      </div>
      <div id="actions" />
    </header>
  )
}

export default Header
