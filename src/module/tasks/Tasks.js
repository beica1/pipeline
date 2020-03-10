/**
 * Tasks.js of pipleline
 * Created by beica on 2019/10/28
 */
import React, { useState } from 'react'
import Task from './components/Task'
import Expand from './components/Expand'
import './Tasks.scss'

const Tasks = () => {
  const [expand, toggle] = useState(false)
  
  const edit = () => {
    toggle(true)
  }
  
  const comment = () => {
    toggle(true)
  }
  
  return (
    expand ?
    <Expand collapse={() => toggle(false)} /> :
    <section className="list">
      <div className="action__bar padding-h-20 flex">
        <div className="flex-1">
          全部
        </div>
        <button className="btn task__new">新建</button>
      </div>
      <div className="tasks">
        <Task edit={edit} comment={comment} />
      </div>
    </section>
  )
}

export default Tasks
