/**
 * Preview.js of pipleline
 * Created by beica on 2019/11/11
 */
import React from 'react'
import Content from './Preview.comp'
import Popover from 'components/Popover'
import './_Preview.scss'

const Preview = ({children, task, ...props}) => {
  return (
    <Popover {...props} popEl={<Content/>}>
      {children}
    </Popover>
  )
}

export default Preview
