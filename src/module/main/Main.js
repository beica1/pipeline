/**
 * Main.js of pipleline
 * Created by beica on 2020/1/7
 */
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from 'components/Nav'
import Loading from 'components/Loading.module'

const Main = () => {
  return (
    <>
      <Nav />
      <div className="board flex-1 frosted black radius scroll-y padding-10">
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route exact path="/" component={lazy(() => import('module/tasks/Tasks'))} />
            <Route path="/market" component={lazy(() => import('module/pool/TaskPool'))} />
            <Route path="/timeline" component={lazy(() => import('module/timeline/TimeLine'))} />
            <Route path="/done" component={lazy(() => import('module/history/History'))} />
            <Route path="/me" component={lazy(() => import('module/user/Me'))} />
          </Switch>
        </Suspense>
      </div>
    </>
  )
}

export default Main
