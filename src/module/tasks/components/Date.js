/**
 * Date.js of pipleline
 * Created by beica on 2019/12/26
 */
import React from 'react'
import DatePicker from 'components/DatePicker.inline'
import StepInput from 'components/StepInput'
import { addDay, formatTime } from 'utils/date'
import makeFormItem from 'components/form/FormItem'
import config from 'config'
import { useField } from 'formik'

const formatter = v => v ? `${v}H` : '无'

const IDate = ({ value: deliveryTime, onChange: setDeliveryTime }) => {
  const [releaseDate, changeDueDate] = React.useState(() => addDay(1, new Date()))
  const [, { value: testTime, error }, { setValue }] = useField('testTime')
  
  const setReleaseDate = v => {
    changeDueDate(v)
    setDeliveryTime(addDay(-testTime / 8, v))
  }
  
  const setTestTime = v => {
    setDeliveryTime(addDay(-v / 8, releaseDate))
    setValue(v)
  }
  
  return <table>
    <tbody>
    <tr>
      <td>
        <DatePicker value={releaseDate} change={setReleaseDate}/>
      </td>
      <td>计划上线日期</td>
    </tr>
    <tr>
      <td>
        <StepInput value={testTime} step={4} format={formatter} min={0} change={setTestTime}/>
        {error && <p className="form__item-err">{error}</p>}
      </td>
      <td>预留测试时长</td>
    </tr>
    <tr>
      <td>
        <p>{formatTime(config.timeFormat, deliveryTime)}</p>
      </td>
      <td>计划交付日期</td>
    </tr>
    </tbody>
  </table>
}

export default makeFormItem(IDate, true)
