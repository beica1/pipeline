/**
 * notification.js of pipeline
 * Created by beica on 2020/1/9
 */
import * as R from 'ramda'
import events from 'config/events'
import { emit } from './eventBus'

const callbacks = []

export const subscribe = cb => {
  callbacks.push(cb)
}

export const notify = R.partial(emit, [events.NOTIFY])
