/**
 * @description useTableHeader.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/19>
 */
import React from 'react'

/**
 * @constructor
 * @param {Array} cols
 * @param {Number} cols[].width
 * @param {String} cols[].title
 * @returns {[*, *]}
 */
const useTableHeader = (cols) => {
  const Align = React.memo(() => <colgroup>
    {cols.map(col => <col key={col.title} width={col.width ? `${col.width}%` : ''} />)}
  </colgroup>)
  
  const Header = React.memo(() => <tr>
    {cols.map(col => <th key={col.title}>{col.title}</th>)}
  </tr>)
  
  return [Align, Header]
}

export default useTableHeader
