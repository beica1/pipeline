/**
 * Portal.js of pipleline
 * Created by beica on 2019/11/11
 */
import { useEffect } from 'react'
import ReactDom from 'react-dom'

const Portal = ({ children, selector = 'body', className = '' }) => {
  const node = document.createElement('div')
  node.classList.add('portal')
  
  useEffect(() => {
    if (className) {
      node.classList.add(className)
    }
    document.querySelector(selector).appendChild(node)
    
    return () => {
      document.querySelector(selector).removeChild(node)
    }
  })
  
  return ReactDom.createPortal(children, node)
}

export default Portal
