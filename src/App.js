import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Nav from './components/Nav'
import CoinIndex from './components/CoinIndex'
import ICouldHaveMadeWhat from './components/ICouldHaveMadeWhat'
import WhatsHot from './components/WhatsHot'
import CoinShow from './components/CoinShow'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/coins/:id" component={CoinShow} />
        <Route path="/coins" component={CoinIndex} />
        <Route path='/icouldhavemadewhat' component={ICouldHaveMadeWhat} />
        <Route path='/whatshot' component={WhatsHot}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
