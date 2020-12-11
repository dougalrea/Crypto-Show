import React from 'react'
import { Link } from 'react-router-dom'



function Home() {

  return (
    
			
    <section className="hero is-primary is-fullheight ">
      <div className="hero-body home-container" >
        <div className="container">
          <h1 className="title is-1 has-text-centered">
        Home
          </h1>
          <div className="container home-buttons"> 
            <Link to="/coins">
              <h2 className="subtitle has-text-centered home-button is-4">
        See All Currencies
              </h2>
            </Link>
            <Link to="/icouldhavemadewhat">
              <h2 className="subtitle has-text-centered home-button is-4">
						I Could Have Made What!!!
              </h2>
            </Link>
            <Link to="/whatshot">
              <h2 className="subtitle has-text-centered home-button is-4">
						Whats Hot
              </h2>
            </Link>
          </div>
        
        </div>
      </div>
    </section>



   
      
    
  )
}

export default Home