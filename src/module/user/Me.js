/**
 * Me.js of pipeLine
 * Created by beica on 2019/10/28
 */
import React from 'react'
import fetch from 'tools/dataSource'
import { login as loginQuery } from './user.ds'

export default () => {
  const login = () => fetch({
    query: loginQuery
  }, '/api/login')
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  )
}
