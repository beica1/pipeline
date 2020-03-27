/**
 * Notification.js of pipeline
 * Created by beica on 2020/1/9
 */
import * as R from 'ramda'
import React, { useEffect, useCallback } from 'react'
import { guid } from 'utils/common'
import config from 'config'
import useArray from 'hooks/useArray'
import { off, on } from 'tools/eventBus'
import events from 'config/events'
import Tip from './Notification.tip'

/**
 * @param {Object} message @see {@link Tip} for detail
 * @param {Function} dismiss
 * @function
 * @constructor
 */
const Message = React.memo(({ message, dismiss }) => {
  const close = useCallback(R.thunkify(dismiss)(R.prop('id', message)))
  
  return <div className="frosted radius">
    {R.is(String, R.prop('body', message))
      ? <Tip message={message} dismiss={close} />
      : <message.body dismiss={close} />}
  </div>
}, R.pipe(R.unapply, R.pluck('message'), R.apply(R.equals))) // 忽略除message对象更新外的所有UI更新

const formatMessage = message => {
  const getMessageObj = R.cond([
    [R.is(String), R.objOf('body')],
    [R.T, R.identity]
  ])
  return R.mergeRight({
    id: guid(),
    autoClose: true,
    duration: config.messageDuration
  }, getMessageObj(message))
}

const Notification = () => {
  const [messages, { unshift, remove }] = useArray()
  
  const dismiss = id => {
    remove(R.o(R.equals(id), R.prop('id')))
  }
  
  useEffect(() => {
    const handler = R.pipe(formatMessage, unshift)
    on(events.NOTIFY, handler)
    return () => off(events.NOTIFY, handler)
  }, [unshift])
  
  return <div className="notification">
    {messages.map(message => <Message key={message.id} message={message} dismiss={dismiss}/>)}
  </div>
}

export default Notification
