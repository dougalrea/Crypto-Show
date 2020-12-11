import React from 'react'
import { useParams  } from 'react-router-dom'
import  { getSingleCoin } from '../components/api'


function CoinShow(){

  const [coin, setCoin ] = React.useState(null)
  const { id } = useParams()




  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleCoin(id)
        setCoin(data)
        
      } catch (err){
        console.log(err)
      }
    }
    getData() 
  } , [id])
  
  console.log(coin)

  return (
    <section className="section">
      <div className="container ">
        {coin ?
          coin.map(coin => (
            <div key={coin.id} className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src={coin.logo_url} alt={coin.id}/>

                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{coin.name}</p>
                    <p className="subtitle is-6">{coin.id} </p>
                  </div>
                </div>
                <div className="content">
                  <p><span className="coin-show-title">Rank:</span>{` ${coin.rank}`}</p>
                  <p><span className="coin-show-title">Price:</span>{` ${coin.price}`}</p>
                  <p><span className="coin-show-title">Maxium Supply:</span>{` ${coin.max_supply}`}</p>
                  <p><span className="coin-show-title">Market Cap:</span>{` ${coin.market_cap}`}</p>
                  <p><span className="coin-show-title">Number Of Exchanges:</span>{` ${coin.num_exchanges}`}</p>
                  <p><span className="coin-show-title">Number Of Pairs:</span>{` ${coin.num_pairs}`}</p>
                  <p><span className="coin-show-title">First Trade:</span>{` ${coin.first_trade}`}</p>
                  <p><span className="coin-show-title">High:</span>{` ${coin.first_trade}`}</p>
                  <p><span className="coin-show-title">7 Day Volume:</span>{` ${coin.['7d'].volume}`}</p>
                  <p><span className="coin-show-title">7 Day Volume Change:</span>{` ${coin.['7d'].volume_change}`}</p>
                  <p><span className="coin-show-title">7 Day Price PCT:</span>{` ${coin.['7d'].price_change_pct}`}</p>
                  <p><span className="coin-show-title">7 Day Maket Cap Change:</span>{` ${coin.['7d'].market_cap_change}`}</p>
                  <p><span className="coin-show-title">30 Day Volume:</span>{` ${coin.['30d'].volume}`}</p>
                  <p><span className="coin-show-title">30 Day Volume Change</span>{` ${coin.['30d'].volume_change}`}</p>
                  <p><span className="coin-show-title">30 Day Price Change PCT:</span>{` ${coin.['30d'].price_change_pct}`}</p>
                  <p><span className="coin-show-title">30 Day Market Cap Change</span>{` ${coin.['30d'].market_cap_change}`}</p>
                  <p><span className="coin-show-title">365 Day Volume:</span>{` ${coin.['365d'].volume}`}</p>
                  <p><span className="coin-show-title">365 Day Volume Change:</span>{` ${coin.['365d'].volume_change}`}</p>
                  <p><span className="coin-show-title">365 Price Change PCT</span>{` ${coin.['365d'].price_change_pct}`}</p>
                  <p><span className="coin-show-title">365 Market Cap Change:</span>{` ${coin.['365d'].market_cap_change}`}</p>
                </div>
              </div>
            </div>
          ))
          :
          <p>Loading</p>
        }
      </div>
    </section>
  )
}

export default CoinShow






