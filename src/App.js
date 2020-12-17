import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Nav from './components/common/Nav'
import CoinIndex from './components/coins/CoinIndex'
import ICouldHaveMadeWhat from './components/main/ICouldHaveMadeWhat'
import WhatsHot from './components/main/WhatsHot'
import CoinShow from './components/coins/CoinShow'

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
