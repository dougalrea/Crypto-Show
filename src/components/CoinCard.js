/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line camelcase

function CoinCard({ id , rank, logo_url, name, symbol, price, market_cap, ...props } ) {
  
  return (
	
    <div className="container is-fluid"> 
      <Link to={`/coins/${id}`}>
        <div className="columns  is-centered coin-cards">
          <div className="column">
            <h4><span className="mobile-title">Rank:</span>{rank}</h4>
          </div>
          <div className="column">
            {<img src={logo_url} alt={name}/>}
          </div>

          <div className="column">
            <h4 className="name"><span className="mobile-title">Name: </span>{name}</h4>
          </div>

          <div className="column">
            <h4 className="symbol"><span className="mobile-title">Symbol:</span>{symbol}</h4>
          </div>

          <div className="column">
            <h4><span className="mobile-title">Price: </span>{price}</h4>
          </div>

          <div className="column">
            <h4 className={props['1d'] ? props['1d'].price_change_pct < 0 ? 'negativeChange' : 'positiveChange' : ''}><span className="mobile-title">24hr: </span>{props['1d'] ? (props['1d'].price_change_pct * 100).toPrecision(3) : ''}%</h4>
          </div>

          <div className="column">
            <h4><span className="mobile-title">Market Cap: </span>£{Math.round(market_cap / 1000000)} million</h4>
          </div>
          <div className="column">
            <h4><span className="mobile-title">1 Day Volume:  </span>{props['1d'] ? props['1d'].volume : ''}</h4>
          </div>
        </div>
        < hr/>
      </Link>
    </div>



			
    

    
  )
}

export default CoinCard