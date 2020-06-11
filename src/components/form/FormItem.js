/**
 * FormItem.js of pipleline
 * Created by beica on 2019/12/24
 */
import React from 'react'
import { Field } from 'formik'
import cx from 'utils/classnames'


/**
 * @hoc
 * @param FieldComponent
 * @param noTouch
 * @returns {Function}
 * @constructor
 */
const makeFormItem =
  (FieldComponent, noTouch) =>
    ({ className, label, name, tip, ...props }) => {
      return <Field name={name}>
        {({field, form: { setFieldValue }, meta: { touched, error }}) =>
          <div className={cx('form__item', className)}>
            <p className="form__item-label">
              {label}
              {tip && <span className="form__item-tip">{tip}</span>}
            </p>
            <FieldComponent
              {...field}
              onChange={v => setFieldValue(name, v)}
              {...props}
            />
            {
              (noTouch || touched) &&
              error &&
              <div className="padding-v-4">
                <span className="form__item-err">{error}</span>
              </div>
            }
          </div>
        }
      </Field>
    }


export default makeFormItem
