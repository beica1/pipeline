import Preview from './Preview'
import Attachment from './Attachment'
import React from 'react'

/**
 * Task.js of pipleline
 * Created by beica on 2019/11/11
 */
const Task = ({ edit, comment }) => {
  return (
    <div className="task padding-10">
      <div className="task__bar flex-inter-center">
        <p className="bold font-18 flex-1">中国建国70周年活动</p>
        <div className="task__labels flex-middle">
          <span className="task__label">后端</span>
          <span className="task__label">国际化</span>
          <span className="task__label">高优先</span>
          <span className="task__label">邮件模板</span>
        </div>
        <div className="task__actions font-14 margin-left-30">
          <Preview className="task__action" task={{a: 1}}>预览</Preview>
          <span className="task__action" onClick={edit}>编辑</span>
          <Attachment className="task__action">附件(2)</Attachment>
          <span className="task__action" onClick={comment}>评论(13)</span>
          <span className="task__action">确认</span>
          <span className="task__action">推迟</span>
          <span className="task__action">提交</span>
        </div>
      </div>
      <div className="task__log">
        <p className="flex-middle">
          <span className="task-log__node start" />
          <span className="owner">李四</span> 发布于 <span className="create-date">2019/10/30 14:20</span>
        </p>
        <p className="flex-middle">
          <span className="task-log__node end" />
          <span className="owner">张三</span> 完成于 <span className="create-date">2019/10/30 14:20</span>
        </p>
      </div>
    </div>
  )
}

export default Task
