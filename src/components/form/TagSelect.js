/**
 * @description TagSelect.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/24>
 */
import React from 'react'
import Select from 'components/TagSelect'

const FormTagSelect = ({ value, setValue, ...props}) => {
  return <Select {...props} value={value} onChange={setValue} />
}

export default FormTagSelect
