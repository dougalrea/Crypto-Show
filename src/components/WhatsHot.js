import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function WhatsHot(){
  return (
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
  )
}

export default WhatsHot
