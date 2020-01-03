/**
 * Edit.js of pipleline
 * Created by beica on 2019/11/11
 */
import * as R from 'ramda'
import React, { useCallback } from 'react'
import Selector from 'components/TagSelect'
import { coWorkers, requirements } from 'config'
import GradientSlider from 'components/GradientSlider'
import { Form, FormItem, Input } from 'components/form'
import Files from './Files'
import Date from './Date'
import './_Edit.scss'

const requirementFormat = R.applySpec({
  value: R.prop('id'),
  label: R.prop('label')
})

const coWorkerFormat = R.applySpec({
  value: R.prop('groupId'),
  label: R.prop('groupName')
})

const stops = ['#008000', '#ffa502', '#ff4757']
const values = ['正常', '优先', '加急']

const Edit = ({ collapse, readonly = false }) => {
  
  const onChange = useCallback(index => console.log('slide change', index), [])
  
  return (
    <div className="flex fill">
      <div className="flex-1">
        <Form>
          <div className="act__item act__name">
            <label>名称</label>
            <FormItem name="name">
              <Input />
            </FormItem>
          </div>
          <div className="act__item act__requirement">
            <label>需求</label>
            <FormItem name="requirement">
              <Selector tags={requirements} format={requirementFormat} />
            </FormItem>
          </div>
          <div className="act__item act__files">
            <label>文件</label>
            <div className="padding-v-10">
              <FormItem name="files" value={1}>
                <Files />
              </FormItem>
            </div>
          </div>
          <div className="act__item act__actors">
            <label>参与人员</label>
            <FormItem name="actors">
              <Selector tags={coWorkers} format={coWorkerFormat} />
            </FormItem>
          </div>
          <div className="act__item act__time">
            <Date />
          </div>
          <div className="act__item act__priority over-hidden">
            <label>优先级</label>
            <div className="font-12">
              <FormItem name="priority" value={1} className="padding-h-12">
                <GradientSlider stops={stops} values={values} onChange={onChange} />
              </FormItem>
            </div>
          </div>
          <div className="act__item">
            <div className="act__controls flex radius margin-bottom-16">
              <button className="act__action flex-1 cancel" onClick={collapse}>取消</button>
              <button className="act__action flex-1">提交</button>
            </div>
          </div>
        </Form>
      </div>
      <div className="act__preview scroll-y">
        <label>预览</label>
        <img className="margin-top-10" src="/sample_pre.jpg" alt="" />
      </div>
    </div>
  )
}

export default Edit
