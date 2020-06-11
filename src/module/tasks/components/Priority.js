/**
 * @description Priority.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/4/3>
 */
import React from 'react'
import GradientSlider from 'components/GradientSlider'
import makeFormItem from 'components/form/FormItem'

const stops = ['#008000', '#ffa502', '#ff4757']

const values = ['正常', '优先', '加急']

const Priority = ({ setValue }) => {
  return <div className="font-12 padding-h-10">
    <GradientSlider stops={stops} values={values} onChange={setValue}/>
  </div>
}

export default makeFormItem(Priority, true)
