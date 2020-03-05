/**
 * Admin.js of pipleline
 * Created by beica on 2020/1/7
 */
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Header from './components/Header'
import Users from './user/Users'
import Role from './role/Roles'
import Group from './group/Groups'
import Process from './process/Processes'
import './Admin.scss'

const Admin = () => {
  const { path } = useRouteMatch()
  
  return (
    <div className="admin abs-fill admin frosted radius padding-10">
      <Header />
      <div className="scroll-y">
        <Switch>
          <Route exact path={path} component={Users} />
          <Route path={`${path}/group`} component={Group} />
          <Route path={`${path}/process`} component={Process} />
          <Route path={`${path}/role`} component={Role} />
        </Switch>
      </div>
    </div>
  )
}

export default Admin
