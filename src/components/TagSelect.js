/**
 * TagSelect.js of pipleline
 * Created by beica on 2019/11/14
 */
import * as R from 'ramda'
import React, { useState } from 'react'
import cx from 'utils/classnames'

const Tag = ({ checked = false, tag }) => {
  const [active, toggle] = useState(checked)
  return (
    <span
      className={cx({active, 'tag-item': true})}
      onClick={() => toggle(!active)}
    >{tag.label}</span>
  )
}

const TagSelect = ({ tags = [], format = R.identity }) => {
  return (
    <div className="tag-list">
      {tags.map(data => {
        const tag = format(data)
        return (
          <Tag key={tag.value} tag={tag} />
        )
      })}
    </div>
  )
}

export default TagSelect
