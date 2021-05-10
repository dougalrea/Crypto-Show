
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { getAllCoins } from '../lib/api'

const compare = (a, b) => {

  const bandA = a['1d'] ? parseFloat(a['1d'].price_change_pct) : null
  const bandB = b['1d'] ? parseFloat(b['1d'].price_change_pct) : null
  let comparison = 0
  if (bandA > bandB) {
    comparison = 1
  } else if (bandA < bandB) {
    comparison = -1
  }
  return comparison
}

function WhatsHot() {

  const [ten, setTen] = React.useState({
    first: [],
    last: [],
  })

  React.useEffect(() => {
 
    const getData = async () => {
      const requests = Array(1).fill(null).map((_, index) => getAllCoins(index + 1))
      const responses = await Promise.all(requests)
      const formattedResponse = responses.flatMap(res => res.data)
      formattedResponse.sort(compare)
      const firstTen = formattedResponse.slice(0, 10)
      const lastTen = formattedResponse.slice(formattedResponse.length - 10)
      console.log(firstTen)
      console.log(lastTen)
      setTen({
        first: firstTen,
        last: lastTen.reverse(),
      })
    }
    getData()

    const interval = setInterval(() => {
      getData()
    }, 10000)
    return () => clearInterval(interval)
  }, [])



  return (
    <div className="container is-fluid whatsHotContainer">
      <div className="tweets">

        <div className="bitcoin-tweets">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="BitCoin"
            options={{ height: 400 }}/>
        </div>
        <div className="ethereum-tweets">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="ethereum"
            options={{ height: 400 }}/>

        </div>
        <div className="ripple-tweets">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="Ripple_XRP1"
            options={{ height: 400 }}/>
        </div>

        <div className="tether-tweets">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="Tether_to"
            options={{ height: 400 }}/>
        </div>

        <div className="bitcoin-cash-tweets">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="BITCOlNCASH"
            options={{ height: 400 }}/>
        </div>
       
      </div>



      <div className="container is-fluid gainersLosers">
        <hr/>
        <div className="losersContainer">
          <h2>Biggest Losers</h2>
          {!ten.first ? <p>Loading top losers</p> :
            ten.first.map(currency => (
              <div key={currency.id} className="losers">
                <div className="crypto">{currency.name} {(currency['1d'].price_change_pct * 100).toPrecision(4)}%</div>
              </div>
            ))
          }
          
        </div>
        <hr/>
        <div className="gainersContainer">
          <h2>Biggest Gainers</h2>
          {!ten.last ? <p>Loading top gainers</p> :
            ten.last.map(currency => (
              <div key={currency.id} className="gainers">
                <div className="crypto">{currency.name} {(currency['1d'].price_change_pct * 100).toPrecision(4)}%</div>
              </div>
            ))
          }
        </div>
        <hr/>
      </div>
      
    </div>
  )
}

export default WhatsHot
