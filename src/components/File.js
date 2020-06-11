/**
 * @description File.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/27>
 */
import React from 'react'
import ProTypes from 'prop-types'
import useFile from 'hooks/useFile'
import { isFileDesc } from 'utils/file'

const propTypes = {
  filedId: ProTypes.string,
  done: ProTypes.func,
  Remove: ProTypes.func
}

const defaultProps = {
  filedId: undefined
}

const File = ({ fileId, done, children, Remove }) => {
  const [{ isLoading, data: file }, { upload, remove: drop }] = useFile(fileId)
  
  const request = f => {
    upload(f).then(resp => {
      done && done(resp)
    })
  }
  
  const remove = e => {
    // e.preventDefault()
    drop(file.fileId).then(() => {
      console.log(file.id)
      done && done(null)
    })
  }
  
  return <>
    <label>
      <input type="file" style={{display: 'none'}} onChange={e => request(e.target.files[0])}/>
      {isLoading ? '处理中...' : children(file)}
    </label>
    {!isLoading && isFileDesc(file) && Remove && <Remove click={remove} />}
  </>
}

File.propTypes = propTypes
File.defaultProps = defaultProps

export default File
