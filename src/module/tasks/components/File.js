/**
 * File.js of pipleline
 * Created by beica on 2019/12/24
 */
import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import IFile from 'components/File'
import { isFileDesc } from 'utils/file'

const propTypes = {
  placeholder: PropTypes.string,
  update: PropTypes.func,
  file: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.string
  })
}

const Remove = props => <span className="link-btn margin-left-4" onClick={props.click}>删除</span>

const File = ({ placeholder, update, file: defaultFile }) => {
  const [file, setFile] = React.useState(defaultFile)
  
  const done = file => {
    setFile(file)
    update(file)
  }
  
  return <div className="file__item">
    <span className="file__name">{
      isFileDesc(file)
        ? <a target="_blank" href={`/file/${R.prop('fileId', file)}`}>{R.prop('fileName', file)}</a>
        : placeholder
    }</span>
    <IFile done={done} Remove={Remove}>
      {file => <span className="link-btn">{isFileDesc(file) ? '更新' : '上传'}</span>}
    </IFile>
  </div>
}

File.propTypes = propTypes

export default File
