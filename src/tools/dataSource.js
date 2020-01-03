/**
 * dataSource.js of pipleline
 * Created by beica on 2020/1/3
 */
import axios from 'axios'
import * as R from 'ramda'

const parseRespBody = R.prop('data')

export default (data = { query: '{hi}'}, url = '/api') => {
  return axios.post(url, data).then(parseRespBody)
}
