import React, { useState } from 'react';
import Nav from './components/Nav'

function App () {
  const [comp, change] = useState(null)
  return (
    <div className="App fill pos-rel flex flex-col">
      <div className="black">
        <Nav switch={change} />
      </div>
      <div className="board flex-1 frosted radius scroll-y padding-10">{comp}</div>
    </div>
  )
}

export default App
