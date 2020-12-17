import React from 'react'
import { Link } from 'react-router-dom'
import CalculateOpportunityLoss from '../lib/CalculateOpportunityLoss'

function ICouldHaveMadeWhat() {
  const [formdata, setFormdata] = React.useState({
    currency: 'Bitcoin',
    amountInvested: '',
    date: '',
  })

  const [result, setResult] = React.useState(null)

  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const numberResult = await CalculateOpportunityLoss(formdata)
    setResult(parseInt(numberResult))
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form className="column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Cryptocurrency
                <Link to="/coins" className="field">
                  <p className="is-halfwidth is-warning">Browse Cryptocurrencies</p>
                </Link>
              </label>
              <div className="control">
                <select
                  className="input"
                  placeholder="Choose your coin"
                  name="currency"
                  onChange={handleChange}
                  value={formdata.currency}
                >
                  <option name="currency" value="Bitcoin" onSelect={handleChange}>Bitcoin</option>
                  <option name="currency" value="Ethereum" onSelect={handleChange}>Ethereum</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">How much could you have invested?</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="£"
                  onChange={handleChange}
                  name="amountInvested"
                  value={formdata.amountInvested}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  placeholder="Select a date"
                  onChange={handleChange}
                  name="date"
                  value={formdata.date}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-primary">Make me look foolish!</button>
            </div>
            <p className ="field">{result ? `You silly muppet! You could have made £${result}! If only you'd followed your hunches...` : '' }</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ICouldHaveMadeWhat