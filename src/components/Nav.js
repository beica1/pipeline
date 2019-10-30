/**
 * Nav.js of pipleline
 * Created by beica on 2019/10/28
 */
import React from 'react'
import { Link } from 'react-router-dom'

const boards = [
  {
    icon: 'clipboard',
    text: '我的任务/需求',
    path: '/'
  },
  {
    icon: 'shopping-bag',
    text: '需求市场',
    path: '/market'
  },
  {
    icon: 'git-commit',
    text: '时间线',
    path: '/timeline'
  },
  {
    icon: 'check-square',
    text: '已完成',
    path: '/done'
  },
  {
    icon: 'user',
    text: '个人中心',
    path: '/me'
  }
]

const Nav = (props) => {
  return (
    <div className="nav flex-middle frosted panel text-center radius">
      {boards.map(item => (
        <Link key={item.path} to={item.path} className="nav__item flex-1 padding-v-20 padding-h-10">
          <i className={`icon-${item.icon} font-32`} />
          <p className="font-12 bold">{item.text}</p>
        </Link>
      ))}
    </div>
  )
}

export default Nav
