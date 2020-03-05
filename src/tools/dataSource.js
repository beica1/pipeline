/**
 * dataSource.js of pipleline
 * Created by beica on 2020/1/3
 */
import * as R from 'ramda'
import axios from 'axios'
import { login } from 'module/auth'

const parseRespBody = R.prop('data')

const processResponse = R.cond([
  [R.propEq('status', 401), login]
])

const handleErrors = error => {
  processResponse(error.response)
  throw error
}

export default (data = { query: '{hi}'}, url = '/api') => {
  return axios.post(url, data).then(parseRespBody).catch(handleErrors)
}
