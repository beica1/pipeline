/**
 * dataSource.js of pipleline
 * Created by beica on 2020/1/3
 */
import * as R from 'ramda'
import axios from 'axios'
import { login } from 'module/auth'

/**
 * @function
 */
const parseRespBody = R.prop('data')

/**
 * 响应http返回
 * @function
 */
const processResponse = R.cond([
  [R.propEq('status', 401), login]
])

const handleErrors = error => {
  processResponse(error.response)
  throw error
}

/**
 * XMLHTTPRequest 统一接口
 * @param {Object} data
 * @param {String} url
 * @returns {Promise}
 */
export default (data = { query: '{hi}'}, url = '/api') => {
  return axios.post(url, data).then(parseRespBody).catch(handleErrors)
}
