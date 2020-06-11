/**
 * @description file.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/4/1>
 */
import * as R from 'ramda'
import { isStringValue } from './common'

export const isFileDesc = R.ifElse(R.isNil, R.F, R.where({
  fileId: isStringValue,
  fileName: isStringValue
}))
