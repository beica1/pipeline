/**
 * Portal.js of pipleline
 * Created by beica on 2019/11/11
 */
import { useEffect } from 'react'
import ReactDom from 'react-dom'

const Portal = ({ children }) => {
  const node = document.createElement('div')
  
  useEffect(() => {
    
    document.body.appendChild(node)
    
    return () => {
      document.body.removeChild(node)
    }
  })
  
  return ReactDom.createPortal(children, node)
}

export default Portal
