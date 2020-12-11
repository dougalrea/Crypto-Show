/* eslint-disable no-unused-vars */
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
// import GainersLosers from './GainersLosers'
import { getAllCoins } from './api'

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
      const requests = Array(6).fill(null).map((_, index) => getAllCoins(index + 1))
      const responses = await Promise.all(requests)
      const formattedResponse = responses.flatMap(res => res.data)
      formattedResponse.sort(compare)
      const firstTen = formattedResponse.slice(0, 10)
      const lastTen = formattedResponse.slice(formattedResponse.length - 10)
      console.log(firstTen)
      console.log(lastTen)
      setTen({
        first: firstTen,
        last: lastTen,
      })
    }
    getData()

  }, [])



  return (
    <div className="whatsHotContainer">
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
      <div className="gainersLosers">
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



      </div>
    </div>
  )
}

export default WhatsHot
