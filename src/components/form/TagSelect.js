/**
 * @description TagSelect.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/24>
 */
import * as R from 'ramda'
import React from 'react'
import { useField } from 'formik'
import Select from 'components/TagSelect'

const FormTagSelect = ({ name, ...props }) => {
  const [{ value }, , { setValue }] = useField(name)
  console.log('read')
  
  const set = React.useCallback(v => setValue(R.pluck('value', v)), [])
  
  return <Select {...props} onChange={set} />
}

export default FormTagSelect
