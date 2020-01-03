/**
 * Attachment.js of pipleline
 * Created by beica on 2019/11/11
 */
import React, { useState } from 'react'
import Popover from 'components/Popover'
import Content from './Attachment.comp'
import './_Attachement.scss'

const Attachment = ({children, ...props}) => {
  const [style, updateStyle] = useState({})
  
  const open = bounding => {
    updateStyle({
      top: bounding.top  + bounding.height + 10 + 'px',
      left: bounding.left + 'px'
    })
  }
  
  return (
    <Popover popup={<Content style={style} />} open={open} {...props}>{children}</Popover>
  )
}

export default Attachment
