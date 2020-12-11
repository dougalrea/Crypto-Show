// import React from 'react'
// import { getAllCoins } from './api'

// async function GainersLosers() {


//   const [sortedCurrency, setSortedCurrency] = React.useState([])
//   let i = 1

//   const compareNumbers = (a, b) => {
//     return b.price - a.price
//   }

//   React.useEffect(() => {
//     const findRelevant = async () => {
//       while (sortedCurrency.length < 20) {
//         const { data } = await getAllCoins(i)
//         const resultArray = (data.sort(compareNumbers))
//         if (resultArray.length < 19 && resultArray.length > 0) {
//           setSortedCurrency(sortedCurrency.push(resultArray))
//         } else {
//           i++
//         }
//       }
//     }
//     findRelevant()
//   }, [])
  
//   console.log(sortedCurrency)

//   return (
//     <div className="gainerslosers">
//       <div>This is where Gainers & Losers go</div>
//     </div>
//   )
// }

// export default GainersLosers