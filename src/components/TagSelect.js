/**
 * TagSelect.js of pipleline
 * Created by beica on 2019/11/14
 */
import * as R from 'ramda'
import React  from 'react'
import cx from 'utils/classnames'

const getDefaultValue = R.o(R.pluck('value'), R.filter(R.propEq('checked', true)))

/**
 * TagSelect
 * @param {Object[]} tags
 * @param {String|Number} tags[].value 值
 * @param {String} tags[].label 文本
 * @param {Boolean} [tags[].checked] 默认选中
 * @param {Array} defaultValue
 * @param {Function} [format=R.identity]
 * @param {Function} [onChange=R.identity]
 * @param {String} [type='checkbox']
 * @returns {*}
 * @constructor
 */
const TagSelect = (
  {
    tags = [],
    value: defaultValue,
    format = R.identity,
    onChange = R.identity,
    type = 'checkbox'
  }
) => {
  const [value, setValue] = React.useState(() => defaultValue || getDefaultValue(tags))
  
  const change = React.useCallback((val, active) => {
    let nextValue = active ? [...value, val] : R.reject(R.equals(val), value)
    if (type === 'radio') {
      nextValue =  active ? [val] : []
    }
    setValue(nextValue)
    onChange(nextValue)
  }, [onChange, type, value])
  
  return (
    <div className="tag-list">
      {tags.map(data => {
        const tag = format(data)
        const isActive = Boolean(R.find(R.equals(tag.value), value))
        return <span
          key={tag.value || tag.label}
          className={cx('tag-item', isActive && 'active')}
          onClick={() => change(tag.value, !isActive)}
        >
          {tag.label}
        </span>
      })}
    </div>
  )
}

export default React.memo(TagSelect)
