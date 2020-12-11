import React from 'react'

import { getAllCoins } from '../components/api'
import CoinCard from '../components/CoinCard'



function CoinIndex() {
  const [coins, setCoins] = React.useState(null)
  const [pageNumber, setPageNumber] = React.useState(1)

  function increase () {
    setPageNumber(pageNumber + 1)
  }
  function decrease() {
    setPageNumber(pageNumber - 1)
  }

  React.useEffect(() => {
    const getData = async() => {
      try {
        const { data } = await getAllCoins( pageNumber )
        setCoins(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    const interval = setInterval(() => {
      getData()
    }, 10000)
    return () => clearInterval(interval)
  }, [pageNumber])

  return (
    <div className ="container is-fluid ">
      <div className="columns is-centered titles">
		
        <div className="column"> 
          <h2>Rank</h2>
        </div>
        <div className="column">
          <h2>Logo</h2>
        </div>
          
        <div className="column">
          <h2>Symbol</h2>
        </div>

        <div className="column"> 
          <h2>Name</h2>
        </div>

        <div className="column"> 
          <h2>Price (£)</h2>
        </div>

        <div className="column"> 
          <h2>24hr</h2>
        </div>

        <div className="column"> 
          <h2>Market Cap</h2>
        </div>

        <div className="column"> 
          <h2>1 Day Volume</h2>
        </div>

      </div>
      
			
      {coins ?
        coins.map(coin => (
          <CoinCard key={coin.id} {...coin} />
        ))
        :
        <p>...loading</p>
      }
      <div className="buttons is-centered"> 
        <button className="button is-primary" name="prev" disabled={pageNumber <= 1} onClick={decrease}>Previous page</button>
        <button className="button is-primary" name="next" onClick={increase}>Next page</button>
      </div>
    </div>
  )
}

export default CoinIndex