/**
 * Edit.js of pipleline
 * Created by beica on 2019/11/11
 */
import * as R from 'ramda'
import React, { useCallback } from 'react'
import { Formik, Form } from 'formik'
import Selector from 'components/form/TagSelect'
import { coWorkers, requirements } from 'config'
import GradientSlider from 'components/GradientSlider'
import { Input } from 'components/form'
import cx from 'utils/classnames'
import { formatTime } from 'utils/date'
import Files from './Files'
import IDate from './Date'
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

const defaultValue = {
  name: 'ACT' + formatTime('yyyyMMdd', new Date()),
  requirement: [],
  files: [],
  process: '',
  deliveryTime: '',
  releaseTime: '',
  priority: '',
  preview: ''
}

export const Item = ({ label, className, children }) => {
  return <div className={cx('act__item', className)}>
    {label && <label>{label}</label>}
    <div className="form-item">{children}</div>
  </div>
}

const Edit = ({ collapse, readonly = false }) => {
  
  const onChange = useCallback(index => console.log('slide change', index), [])
  
  return <Formik initialValues={defaultValue} onSubmit={(values) => {console.log('submit', values)}}>
    <Form>
      <div className="flex fill">
        <div className="flex-1">
          <Item className="act__name" label="名称">
            <Input name="name"/>
          </Item>
          <Item className="act__requirement" label="需求">
            <Selector name="requirement" tags={requirements} format={requirementFormat}/>
          </Item>
          <Item className="act__files" label="文件">
            <Files />
          </Item>
          <Item className="act__actors" label="参与人员">
            <Selector name="actors" tags={coWorkers} format={coWorkerFormat}/>
          </Item>
          <Item className="act__time" label="时间">
            <IDate />
          </Item>
          <Item className="act__priority" label="优先级">
            <div className="font-12 padding-h-10">
              <GradientSlider stops={stops} values={values} onChange={onChange}/>
            </div>
          </Item>
          <div className="act__item">
            <div className="act__controls flex radius margin-bottom-16">
              <button className="act__action flex-1 cancel" onClick={collapse}>取消</button>
              <button type="submit" className="act__action flex-1">提交</button>
            </div>
          </div>
        </div>
        <div className="act__preview scroll-y">
          <label>预览</label>
          <img className="margin-top-10" src="/sample_pre.jpg" alt=""/>
        </div>
      </div>
    </Form>
  </Formik>
}

export default Edit
