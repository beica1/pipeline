/**
 * Edit.js of pipleline
 * Created by beica on 2019/11/11
 */
import * as R from 'ramda'
import React from 'react'
import { Formik, Form } from 'formik'
import { coWorkers, requirements } from 'config'
import FormField from 'components/form/FormField'
import cx from 'utils/classnames'
import { schema } from './task.ds'
import Files from './Files'
import IDate from './Date'
import Priority from './Priority'
import './_Edit.scss'

const requirementFormat = R.applySpec({
  value: R.prop('id'),
  label: R.prop('label')
})

const coWorkerFormat = R.applySpec({
  value: R.prop('groupId'),
  label: R.prop('groupName')
})

const submit = (values) => {
  console.log('submit', values)
}

const Edit = ({ collapse, readonly = false }) => {
  return <Formik
    validationSchema={schema}
    initialValues={schema.default()}
    onSubmit={submit}
  >
    <Form>
      <div className="task__form flex fill">
        <div className="flex-1 margin-right-30">
          <FormField.Input name="name" className="act__name" label="名称" />
          <FormField.Tags
            name="requirements"
            className="act_requirement"
            label="需求"
            tags={requirements}
            format={requirementFormat}
          />
          <Files name="files" className="act__files" label="文件"/>
          <FormField.Tags
            name="actors"
            className="act_actors"
            label="参与者"
            tags={coWorkers}
            format={coWorkerFormat}
          />
          <IDate name="deliveryTime" className="act__time" label="时间" />
          <Priority name="priority" className="act__priority over-hidden" label="优先级" />
        </div>
        <div className="act__preview scroll-y">
          <label>预览</label>
          <img className="margin-top-10" src="/sample_pre.jpg" alt=""/>
        </div>
      </div>
      <div className="act__controls flex radius margin-bottom-16">
        <button className="act__action flex-1 cancel" onClick={collapse}>取消</button>
        <button type="submit" className="act__action flex-1">提交</button>
      </div>
    </Form>
  </Formik>
}

export default Edit
