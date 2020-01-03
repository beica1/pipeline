import { hot } from 'react-hot-loader'
import React, { Suspense, lazy } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Loading from './components/Loading.module'
import Nav from './components/Nav'

function App () {
  return (
    <Router>
      <div className="App fill pos-rel flex flex-col">
        <div className="black"><Nav /></div>
        <div className="board flex-1 frosted radius scroll-y padding-10">
          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path="/" component={lazy(() => import('./module/tasks/Tasks'))} />
              <Route path="/market" component={lazy(() => import('./module/pool/TaskPool'))} />
              <Route path="/timeline" component={lazy(() => import('./module/timeline/TimeLine'))} />
              <Route path="/done" component={lazy(() => import('./module/history/History'))} />
              <Route path="/me" component={lazy(() => import('./module/user/Me'))} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  )
}

export default hot(module)(App)
