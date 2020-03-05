/**
 * Attachment.js of pipleline
 * Created by beica on 2019/11/11
 */
import React from 'react'
import Popover from 'components/Popover'
import Content from './Attachment.comp'
import './_Attachement.scss'

const Attachment = ({children, ...props}) => {
  return (
    <Popover {...props} popEl={<Content/>}>{children}</Popover>
  )
}

export default Attachment
