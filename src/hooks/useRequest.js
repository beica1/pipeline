/**
 * useRequest.js of pipeline
 * Created by beica on 2020/1/8
 */
import * as R from 'ramda'
import { useReducer, useCallback } from 'react'
import reducer from 'reducers/dataFetchReducer'
import fetch from 'tools/dataSource'
import { LOADING_STATE } from 'config/enum'

const format = fn => (mix, mix2) => {
  let name = null // 请求名称
  let variables = {}
  
  if (R.is(Object, mix2)) {
    variables = mix2
    name = mix
  }
  
  if (R.is(Object, mix)) {
    variables = mix
  }
  
  if (R.is(String, mix)) {
    name = mix
  }
  
  return fn(name, variables)
}

const useRequest = (query, initialData = null, url) => {
  const [state, dispatch] = useReducer(reducer, {
    data: initialData
  })
  
  const request = useCallback(format(async (name, variables) => {
    if (query) {
      dispatch({
        name,
        type: LOADING_STATE.START
      })
      
      try {
        const result = await fetch({query, variables}, url)
        dispatch({
          name,
          type: LOADING_STATE.DONE,
          payload: result.data
        })
      } catch (error) {
        dispatch({
          name,
          type: LOADING_STATE.FAIL,
          error
        })
      }
    }
  }), [query, url])
  
  return [state, request]
}

export default useRequest
