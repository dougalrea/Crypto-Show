/* eslint-disable camelcase */
import React from 'react'
// import { Link } from 'react-router-dom'

// eslint-disable-next-line camelcase

function CoinCard({ rank, logo_url, name, symbol, price, market_cap, ...props } ) {
  
  return (
	
    <div className="container is-fluid"> 
      <div className="columns  is-centered coin-cards">
        <div className="column">
          <h4>{rank}</h4>
        </div>
        <div className="column">
          {<img src={logo_url} alt={name}/>}
        </div>

        <div className="column">
          <h4 className="name">{name}</h4>
        </div>

        <div className="column">
          <h4 className="symbol">{symbol}</h4>
        </div>

        <div className="column">
          <h4>{price}</h4>
        </div>

        <div className="column">
          <h4>{props['1d'].price_change}</h4>
        </div>

        <div className="column">
          <h4>{market_cap}</h4>
        </div>
        <div className="column">
          <h4>{props['1d'].volume}</h4>
        </div>
      </div>
      < hr/>
    </div>



			
    

    
  )
}

export default CoinCard