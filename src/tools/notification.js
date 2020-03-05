/**
 * notification.js of pipeline
 * Created by beica on 2020/1/9
 */
const callbacks = []

export const subscribe = cb => {
  callbacks.push(cb)
}

export const notify = message => {
  callbacks.map(fn => fn(message))
}
