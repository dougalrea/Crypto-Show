import React from 'react'
import { Link } from 'react-router-dom'

function Nav(){
  return (
    <nav className="navbar is-primary"> 
      <div className="container"> 
        <div className="navbar-brand">
          <Link to="/" className="navbar-item is-light">Home </Link>
          <Link to="/coins" className="navbar-item is-light">Coins</Link>
          <Link to="/icouldhavemadewhat" className="navbar-item is-light">I Could Have Made What?</Link>
          <Link to='/whatshot' className="navbar-item is-light">Whats hot</Link>
					
        </div>
      </div>
    </nav>
  )
}


export default Nav