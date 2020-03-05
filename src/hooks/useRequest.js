/**
 * useRequest.js of pipeline
 * Created by beica on 2020/1/8
 */
import { useReducer } from 'react'
import reducer from 'reducers/dataFetchReducer'
import fetch from 'tools/dataSource'

const useRequest = (query, initialData = null, url) => {
  const [state, dispatch] = useReducer(reducer, {
    data: initialData
  })
  
  const request = async (variables = {}) => {
    if (query) {
      dispatch({
        type: 'LOADING'
      })
  
      try {
        const result = await fetch({query, variables}, url)
        dispatch({
          type: 'DONE',
          payload: result.data
        })
      } catch (error) {
        dispatch({
          type: 'FAIL',
          error
        })
      }
    }
  }
  
  return [state, request]
}

export default useRequest
