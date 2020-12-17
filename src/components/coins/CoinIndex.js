import React from 'react'

import { getAllCoins } from '../lib/api'
import CoinCard from '../coins/CoinCard'



function CoinIndex() {
  const [coins, setCoins] = React.useState(null)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [selectedName, setSelectedName] = React.useState('')

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
        const filterCurrencies = () => data.filter(currency => {
          return currency.name.toLowerCase().includes(selectedName.toLowerCase())
        })
        setCoins(filterCurrencies())
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    const interval = setInterval(() => {
      getData()
    }, 10000)
    return () => clearInterval(interval)
  }, [selectedName, pageNumber])


  const handleKeyUp = (e) => {
    const selectedName = e.target.value
    setSelectedName(selectedName)
  }

 


  return (
    <div className ="container is-fluid ">
      <input placeholder="Search" onKeyUp={handleKeyUp} className="search-bar"/>
      <div className="columns is-centered titles coin-index">
		
        <div className="column"> 
          <h2>Rank</h2>
        </div>
        <div className="column">
          <h2>Logo</h2>
        </div>
          
        <div className="column">
          <h2>Name</h2>
        </div>

        <div className="column"> 
          <h2>Symbol</h2>
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