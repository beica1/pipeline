/**
 * Manage.js of pipeline
 * Created by beica on 2020/3/5
 */
import React from 'react'
import Popover from 'components/Popover'
import Panel from './Manage.panel'

const Manage = ({ member }) => {
  return (
    <Popover className="link-btn" popEl={<Panel member={member} />}>
      管理({member.length})
    </Popover>
  )
}

export default Manage
