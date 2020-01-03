/**
 * Tasks.js of pipleline
 * Created by beica on 2019/10/28
 */
import React, { useState } from 'react'
import useFetch from 'hooks/useFetch'
import Task from './components/Task'
import Expand from './components/Expand'
import { task } from './tasks.ds'
import './Tasks.scss'

const Tasks = () => {
  const [expand, toggle] = useState(false)
  const [state] = useFetch(task, [], {taskId: 'jo'})
  
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
      <div className="sort__bar padding-h-20">
        全部
        {JSON.stringify(state.data)}
      </div>
      <div className="tasks">
        <Task edit={edit} comment={comment} />
      </div>
    </section>
  )
}

export default Tasks
