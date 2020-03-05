import { hot } from 'react-hot-loader'
import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Main from 'module/main/Main'
import Admin from 'module/admin/Admin'
import Login from 'module/login/Login'
import Notification from './components/Notification'
import { onLogin, offLogin, onLogged, offLogged } from './module/auth'

function App () {
  const [logged, update] = useState(true)
  
  const login = () => {
    update(false)
  }
  
  const auth = () => {
    update(true)
  }
  
  useEffect(() => {
    onLogin(login)
    onLogged(auth)
    
    return () => {
      offLogin(login)
      offLogged(auth)
    }
  })
  
  return (
    <Router>
      <div className="App fill pos-rel flex flex-col">
        {
          logged
          ? <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Main} />
            </Switch>
          : <Login/>
        }
      </div>
      <Notification />
    </Router>
  )
}

export default hot(module)(App)
