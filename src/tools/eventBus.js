/**
 * eventBus.js of pipeline
 * Created by beica on 2020/1/9
 */
import * as R from 'ramda'
import EventBus from 'events'

/**
 * @instance
 * @type {EventBus}
 */
const ee = new EventBus()

export const on = R.bind(ee.on, ee)

export const emit = R.bind(ee.emit, ee)

export const off = R.bind(ee.off, ee)

export const once = R.bind(ee.once, ee)
