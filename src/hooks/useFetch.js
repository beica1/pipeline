/**
 * useFetch.js of pipleline
 * Created by beica on 2020/1/3
 */
import { useState, useEffect, useReducer } from 'react'
import reducer from 'reducers/dataFetchReducer'
import fetch from 'tools/dataSource'

const useFetch = (initialQuery, initialData, initialVars, initialUrl) => {
  const [query, setQuery] = useState(initialQuery)
  const [variables, setVars] = useState(initialVars)
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })
  
  useEffect(() => {
    let canceled = false;
    
    (async () => {
      dispatch({
        type: 'LOADING'
      })
      try {
        const result = await fetch({ query, variables }, url)
        if (!canceled) {
          dispatch({
            type: 'DONE',
            payload: result.data
          })
        }
      } catch (error) {
        if (!canceled) {
          dispatch({
            type: 'FAIL',
            error
          })
        }
      }
    })()
    return () => {
      canceled = true
    }
  }, [query, variables, url])
  
  return [state, setQuery, setVars, setUrl]
}

export default useFetch
