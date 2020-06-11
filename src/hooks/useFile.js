/**
 * @description useFile.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/31>
 */
import React from 'react'
import reducer from 'reducers/dataFetchReducer'
import { LOADING_STATE } from 'config/enum'
import fetch from 'tools/dataSource'

const useFile = fileId => {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null
  })
  
  const upload = React.useCallback(async file => {
    const name = '文件上传'
    
    const data = new FormData()
    data.append('file', file)
    
    dispatch({
      name,
      type: LOADING_STATE.START
    })
  
    try {
      const result = await fetch(data, `/file/upload${fileId ? ('/' + fileId) : ''}`)
      dispatch({
        name,
        type: LOADING_STATE.DONE,
        payload: result.data
      })
      return result.data
    } catch (error) {
      dispatch({
        name,
        type: LOADING_STATE.FAIL,
        error
      })
    }
  }, [fileId])
  
  const remove = async id => {
    const name = '文件删除'
  
    dispatch({
      name,
      type: LOADING_STATE.START
    })
  
    try {
      const result = await fetch({}, `/file/remove/${id}`)
      dispatch({
        name,
        type: LOADING_STATE.DONE,
        payload: result.data
      })
      return result.data
    } catch (error) {
      dispatch({
        name,
        type: LOADING_STATE.FAIL,
        error
      })
    }
  }
  
  return [
    state,
    { upload, remove }
  ]
}

export default useFile
