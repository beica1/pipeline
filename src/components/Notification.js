/**
 * Notification.js of pipeline
 * Created by beica on 2020/1/9
 */
import * as R from 'ramda'
import React, { useState, useEffect } from 'react'
import { subscribe } from 'tools/notification'

const Message = ({ message, dismiss }) => {
  return (
    R.is(String, message)
    ? message.message
    : <div className="message frosted radius">
        {String(message.message)}
      <button onClick={() => dismiss(message.id)} >close</button>
      </div>
  )
}

const formatMessage = message => {
  if (R.is(String, message)) {
  }
  return {
    id: Math.random(),
    message
  }
}

const Notification = () => {
  const [messages, update] = useState([])
  
  const dismiss = id => {
    update(R.reject(R.o(R.equals(id), R.prop('id'))))
  }
  
  useEffect(() => {
    subscribe(message => {
      update(original => [formatMessage(message), ...original])
    })
  }, [])
  
  return (
    <div className="notification">
      {messages.map(message => <Message key={message.id} message={message} dismiss={dismiss} />)}
    </div>
  )
}

export default Notification
