/**
 * Attachment.comp.js of pipleline
 * Created by beica on 2019/11/11
 */
import React from  'react'

const AttachmentComponent = ({ style }) => {
  return (
    <div className="mask">
      <ul style={style} className="attachments frosted black">
        <li className="attachment">
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
