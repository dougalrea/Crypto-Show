import axios from 'axios'

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1'
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

