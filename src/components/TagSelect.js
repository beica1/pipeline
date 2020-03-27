/**
 * TagSelect.js of pipleline
 * Created by beica on 2019/11/14
 */
import * as R from 'ramda'
import React  from 'react'
import cx from 'utils/classnames'

/**
 * TagSelect
 * @param {Object[]} tags
 * @param {String} tags[].value 值
 * @param {String} tags[].label 文本
 * @param {Boolean} [tags[].checked] 默认选中
 * @param {Function} [format=R.identity]
 * @param {Function} [onChange=R.identity]
 * @param {String} [type='checkbox']
 * @returns {*}
 * @constructor
 */
const TagSelect = ({tags = [], format = R.identity, onChange = R.identity, type = 'checkbox'}) => {
  const [value, setValue] = React.useState(() => R.filter(R.propEq('checked', true), tags))
  
  const change = React.useCallback((tag, active) => {
    let nextValue = active ? [...value, tag] : R.reject(R.equals(tag), value)
    if (type === 'radio') {
      nextValue =  active ? [tag] : []
    }
    setValue(nextValue)
    onChange(nextValue)
  }, [onChange, type, value])
  
  return (
    <div className="tag-list">
      {tags.map(data => {
        const tag = format(data)
        const state = Boolean(R.find(R.equals(tag), value))
        return <span
          key={tag.value || tag.label}
          className={cx('tag-item', state && 'active')}
          onClick={() => change(tag, !state)}
        >
          {tag.label}
        </span>
      })}
    </div>
  )
}

export default React.memo(TagSelect)
