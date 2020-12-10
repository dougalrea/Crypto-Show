import { getAllCoinsUSD } from '../components/api'
import axios from 'axios'

async function CalculateOpportunityLoss(formdata) {

  const key = process.env.REACT_APP_MY_API_KEY

  const foundCurrency = []
  let i = 1
  while (foundCurrency.length < 1) {
    const { data } = await getAllCoinsUSD(i)
    const resultArray = (data.filter(coinObject => {
      return coinObject.name === formdata.currency
    }))
    if (resultArray.length > 0) {
      foundCurrency.push(resultArray)
    } else {
      i++
    }
  }

  const currencyId = (formdata) => {
    if (formdata.currency === 'Bitcoin') {
      return 'BTC'
    } else return 'ETH'
  }

  const relevantId = currencyId(formdata)
  const relevantStartDate = new Date(formdata.date)
  const formattedStartDate = relevantStartDate.toISOString()
  const relevantEndDate = new Date(formdata.date)
  const formattedEndDate = relevantEndDate.toISOString()

  const getHistoricValue = async () => {
    const { data } = await axios.get(`https://api.nomics.com/v1/exchange-rates/history?key=${key}&currency=${relevantId}&start=${formattedStartDate}&end=${formattedEndDate}`)
    return data[0].rate
  }
  getHistoricValue()

  const calcNumericalResult = async () => {
    const currentValue = foundCurrency[0][0].price
    const historicValue = await getHistoricValue()

    return ((parseFloat(currentValue) / parseFloat(historicValue)) * parseFloat(formdata.amountInvested))
  }

  return (
    await calcNumericalResult()
  )
}
export default CalculateOpportunityLoss
