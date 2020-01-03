/**
 * Files.js of pipleline
 * Created by beica on 2019/12/24
 */
import React from 'react'

const Files = ({ value, update }) => {
  return (
    <ul>
      <li>{value}</li>
      <li>
        <span className="file-name">需求文档</span>
        <span onClick={() => update(1)}>change 1</span>
      </li>
      <li>
        <span className="file-name">国际化文档</span>
        <span onClick={() => update(2)}>change 2</span>
      </li>
    </ul>
  )
}

export default Files
