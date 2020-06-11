/**
 * Files.js of pipleline
 * Created by beica on 2019/12/24
 */
import React from 'react'
import makeFormItem from 'components/form/FormItem'
import File from './File'

const files = [
  '需求文档',
  '设计稿',
  '国际化文档'
]

const Files = ({ value, onChange }) => {
  const set = (index, file) => {
    const next = value
    next[index] = file
    onChange(next)
  }
  
  return files.map((file, index) => <File key={file} placeholder={file} update={file => set(index, file)} />)
}

export default makeFormItem(Files)
