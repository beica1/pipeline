/**
 * auth.js of pipeline
 * Created by beica on 2020/1/9
 */
import * as R from 'ramda'
import { on, emit, off } from 'tools/eventBus'
import events from 'config/events'

export const login = () => emit(events.LOGIN)

export const logged = () => emit(events.LOGGED)

export const onLogin = R.partial(on, [events.LOGIN])

export const onLogged = R.partial(on, [events.LOGGED])

export const offLogged = R.partial(off, [events.LOGGED])

export const offLogin = R.partial(off, [events.LOGIN])

