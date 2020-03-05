/**
 * Login.js of pipeline
 * Created by beica on 2020/1/9
 */
import React, { useState } from 'react'
import useRequest from 'hooks/useRequest'
import { login as loginQuery, auth as authQuery } from './login.ds'
import { logged } from '../auth'

const buttonStyle = {
  display: 'inline-block',
  width: '200px',
  height: '40px'
}

const tipColor = {
  color: 'grey',
  fontSize: '10px'
}

const Login = () => {
  const [, login] = useRequest(loginQuery, null, '/api/login')
  const [, auth] = useRequest(authQuery, null, '/api/login')
  const [user, updateUser] = useState('')
  const [pwd, updatePwd] = useState('')
  const [code, updateCode] = useState('')
  
  const request = () => {
    if (code) {
      auth({ code }).then(logged)
    } else if (user && pwd) {
      login({ user, pwd }).then(logged)
    }
  }
  
  return (
    <div className="frosted padding-10 radius">
      <div className="flex margin-v-30">
        <div className="flex-1 text-center">
          <div className="margin-bottom-20">
            <p>账户密码登录</p>
            <span style={tipColor}>[用户，组内管理员]</span>
          </div>
          <div>
            <div>
              <input type="text" placeholder="请输入账号" value={user} onChange={e => updateUser(e.target.value)}/>
            </div>
            <div className="margin-top-20">
              <input type="text" placeholder="请输入密码" value={pwd} onChange={e => updatePwd(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="flex-middle font-12">或</div>
        <div className="flex-1 text-center">
          <div className="margin-bottom-20">
            <p>授权码登录</p>
            <span style={tipColor}>[超级管理员]</span>
          </div>
          <div>
            <input type="text" placeholder="请输入授权码" value={code} onChange={e => updateCode(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="text-center margin-bottom-20">
        <button className="btn" style={buttonStyle} onClick={request}>登入</button>
      </div>
    </div>
  )
}

export default Login
