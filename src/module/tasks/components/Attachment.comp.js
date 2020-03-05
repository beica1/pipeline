/**
 * Attachment.comp.js of pipleline
 * Created by beica on 2019/11/11
 */
import React, { useState, useEffect, useCallback } from  'react'

const AttachmentComponent = ({ coord }) => {
  const getPos = useCallback(() => {
    return {
      top: coord.top  + coord.height + 10 + 'px',
      left: coord.left + 'px'
    }
  }, [coord])
  
  const [style, update] = useState(() => getPos(coord))
  
  const download = (e) => {
    e.stopPropagation()
    console.log('download')
  }
  
  useEffect(() => {
    update(getPos(coord))
  }, [coord, getPos])
  
  return (
    <div className="mask">
      <ul style={style} className="attachments frosted black">
        <li className="attachment" onClick={download}>
          <span className="attachment__name">附件1 </span>
          <span className="color-blue">下载</span>
        </li>
        <li className="attachment">
          <span className="attachment__name">附件1 </span>
          <span className="color-blue">下载</span>
        </li>
        <li className="attachment">
          <span className="attachment__name">附件1 </span>
          <span className="color-blue">下载</span>
        </li>
      </ul>
    </div>
  )
}

export default AttachmentComponent
