/**
 * Nav.js of pipleline
 * Created by beica on 2019/10/28
 */
import React from 'react'
import Tasks from 'module/tasks/Tasks'
import Pool from 'module/pool/TaskPool'
import PipeLine from 'module/pipeLine/PipeLine'
import Me from 'module/me/Me'

const boards = [
  {
    icon: 'clipboard',
    text: '我的任务/需求',
    comp: Tasks
  },
  {
    icon: 'shopping-bag',
    text: '需求市场',
    comp: Pool
  },
  {
    icon: 'git-commit',
    text: '时间线',
    comp: PipeLine
  },
  {
    icon: 'check-square',
    text: '已完成',
    comp: null
  },
  {
    icon: 'user',
    text: '个人中心',
    comp: Me
  }
]

const Nav = (props) => {
  return (
    <div className="nav flex-middle frosted panel text-center radius">
      {boards.map(item => (
        <div className="nav__item flex-1 padding-v-20 padding-h-10" key={item.icon} onClick={() => props.switch(item.comp)}>
          <i className={`icon-${item.icon} font-32`} />
          <p className="font-12 bold">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Nav
