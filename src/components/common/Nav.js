import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Nav(){

  const { pathname  } = useLocation()
  return (
    <nav className="navbar is-primary"> 
      { pathname !== '/' &&
      <div className="container"> 
        <div className="navbar-brand">
          <Link to="/" className="navbar-item is-light">Home </Link>
          <Link to="/coins" className="navbar-item is-light">Coins</Link>
          <Link to="/icouldhavemadewhat" className="navbar-item is-white">I Could Have Made What?</Link>
          <Link to='/whatshot' className="navbar-item is-light">Whats Hot</Link>
					
        </div>
      </div>
      }
    </nav>
   
  )
}


export default Nav