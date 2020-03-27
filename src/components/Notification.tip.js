/**
 * @description Notification.tip.js of pipeline
 * @author 贝才 <beica1@outook.com>
 * @date <2020/3/19>
 */
import React, { useEffect, useState  } from 'react'

/**
 * Tip
 * @param {Object} message
 * @param {String} message.id
 * @param {String} message.body
 * @param {Number} message.duration
 * @param {Function} dismiss
 * @returns {*}
 * @constructor
 */
const Tip = ({ message, dismiss }) => {
  const [start] = useState(Date.now())
  const [left, update] = useState(message.duration)
  const [timer, set] = useState(null)
  
  const pause = () => {
    clearTimeout(timer)
    // 更新剩余时间
    update(left - (Date.now() - start))
  }
  
  const goon = () => {
    set(setTimeout(dismiss, left))
  }
  
  useEffect(() => {
    set(setTimeout(dismiss, left))
    return () => {
      clearTimeout(timer)
    }
  }, [])
  
  console.log(message.id)
  
  return <div className="margin-top-10 flex-inter-center" onMouseEnter={pause} onMouseLeave={goon}>
    <p className="flex-1 padding-10">{message.body}</p>
    <span className="link-btn border-left padding-10 font-12" onClick={dismiss}>了解</span>
  </div>
}

export default Tip
