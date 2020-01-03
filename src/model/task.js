/**
 * task.js of pipleline
 * Created by beica on 2019/12/26
 */
import * as R from 'ramda'

export default R.where({
  name: R.is(String),
  requirement: R.is(String),
  files: R.is(String),
  actors: R.is(String),
  dueDate: R.is(String),
  testTime: R.is(String),
  priority: R.is(String)
})
