import axios from 'axios'

const baseUrl = 'https://api.nomics.com/v1'
const key = process.env.REACT_APP_MY_API_KEY


export function getAllCoins(pageNumber) {
  return (
    axios.get(`${baseUrl}/currencies/ticker?key=${key}&interval=1d&convert=GBP&sort=rank&per-page=100&page=${pageNumber}`)
  )
}

export function getAllCoinsUSD(pageNumber) {
  return (
    axios.get(`${baseUrl}/currencies/ticker?key=${key}&interval=1d&convert=USD&sort=rank&per-page=100&page=${pageNumber}`)
  )
}

export async function getHistoricValueObject(urlRequest) {
  return axios.get(urlRequest)
}

export function getSingleCoin(id) {
  return axios.get(`${baseUrl}/currencies/ticker?key=${key}&ids=${id}&convert=GBP`)
}

// const currency = formdata.currency
// const start = formdata.date
// const end = formdata.date

// return console.log(`${baseUrl}/exchange-rates/history?key=${key}&currency=${currency}&start=${start}&end=${end}`)

// (axios.get(`${baseUrl}/v1/exchange-rates/history?key=${key}&currency=${relevantId}&start=${relevantStartDate}&end=${relevantEndDate}`))