/**
 * Date.js of pipleline
 * Created by beica on 2019/12/26
 */
import React, { useEffect, useState } from 'react'
import { FormItem, Input } from 'components/form'
import DatePicker from 'components/DatePicker.inline'
import StepInput from 'components/StepInput'
import { addDay, formatTime } from 'utils/date'
import config from 'config'

const IDate = () => {
  const [dueDate, changeDueDate] = useState(() => addDay(1, new Date()))
  const [testTime, changeTestTime] = useState(4)
  const [deadline, changeDeadline] = useState()
  
  useEffect(() => {
    changeDeadline(addDay(-testTime / 8, dueDate))
  }, [dueDate, testTime])
  
  return (
    <>
      <label>时间</label>
      <table>
        <tbody>
        <tr>
          <td>
            <FormItem name="dueDate" value={dueDate}>
              <DatePicker change={changeDueDate} />
            </FormItem>
          </td>
          <td>计划上线日期</td>
        </tr>
        <tr>
          <td>
            <FormItem name="testTime" value={testTime}>
              <StepInput step={4} format={v => `${v}h`} min={0} change={changeTestTime} />
            </FormItem>
          </td>
          <td>预留测试时长</td>
        </tr>
        <tr>
          <td>
            <FormItem name="deliveryDate" value={formatTime(config.dateFormat, deadline)}>
              <Input readOnly />
            </FormItem>
          </td>
          <td>计划交付日期</td>
        </tr>
        </tbody>
      </table>
    </>
  )
}

export default IDate
