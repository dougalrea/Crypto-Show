# Crypto Show: Pair-programming Reactathon

## Overview

Crypto Show is a single page React Application with multiple components. The app consumes cryptocurrency data from Nomics Public API and mounts the data back to the app. The data is then manipulated and rendered in an interactive way for the user. The application is deployed online and hosted by Netlify. **[Check it out here!](https://festive-curran-721d2b.netlify.app/)**

This was the second project I completed as a student of Software Engineering Immersive at General Assemnbly. This was a pair project, where my team mate and I were tasked with building a functional React Application which consumed data from a public API in only 48 hours.

## Technologies used

- React & JSX
- JavaScript
- Axios
- Bulma
- Netlify
- Nomics API
- VS Code Live Share
- Insomnia
- Sass
- Git

## The App: Crypto Show


### How to use the App
When a user first logs in to the app they are presented with the home page. The Nav Bar is hidden at this point, but the user can select one of three links below the heading.

![Home page](/src/Resources/home.png "Home page")

If a user clicks, ‘See All Currencies’ they are taken to the page that corresponds to ‘coins’ in the Nav Bar. This page lists all the crypto currencies in the Nomics API, ordered by market capitalisation. The user can search for a currency by name or scroll through the currencies page by page, with each page showing 100 results. 

![Index page](/src/Resources/index.png "Index page")

The user can then click on a cryptocurrency and will be taken to another page which displays much more data about that currency, including 7-day, 30-day & 365-day historical market data.

![Coin page](/src/Resources/coin.png "Coin page")

If the user clicks ‘I Could Have Made What!’ at the home page, they are taken to the page which calculates how much money the user could have made by investing in either Bitcoin or Ethereum on a specific date.

![Opportunity cost calculator!](/src/Resources/calculator.png "Calculator")

Lastly, if a user selects ‘Whats Hot’ at the home page, they are presented with the embedded twitter pages of Bitcoin, Ethereum, Bitcoin cash, Ripple, and Tether Beneath these is a 'biggest gainers and losers' banner which lists the five currencies which gained and lost the most value in the past 24 hours. All data displayed throughout the application is updated automatically every 10 seconds.

![What's hot page!](/src/Resources/hot.png "What's hot page")


## Approach

Once we had a solid idea of the API we would build the application from, we mapped out a rough visual representation of what pages the app should look like using wireframes.

We began the project by creating the site architecture. This meant creating all the components that would be used in the app, and listing them within a navigable backbone built from Route, Switch, and BrowserRouter from `react-router-dom`. Here's what that looks like in App.js:

    function App() {
      return (
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/coins/:id" component={CoinShow} />
            <Route path="/coins" component={CoinIndex} />
            <Route path='/icouldhavemadewhat' component={ICouldHaveMadeWhat} />
            <Route path='/whatshot' component={WhatsHot}/>
          </Switch>
        </BrowserRouter>
      )
    }

    export default App

To stick to a clean modern design we chose to hide the Nav Bar on the home page and display the three main components of the app beneath the title. Tim was responsible for designing the navigation bar and the home page.

## All Currencies Page

The first interactive component we created was the index page, wherein the user can view the key information of all cryptocurrencies on the Nomics API. We used Axios to make the GET request to retrieve data from all currencies. Once we'd successfully received and examined the data on Insomnia, we mapped through the data to proccess the results. For each element in the array of results, a new ‘CoinCard’ component was created. ‘CoinCard’ was written in as a child component of the ‘CoinIndex’. 

At this point we realised we were only able to request 100 results at a time. To overcome this problem we added a function that would display page numbers at the bottom of the page. A user would start on page one. When a user clicked page 2, a new GET request was made for the next 100 results. Then we added a search function that allowed a user to search for a currency by name.

The code snippet below shows the functions we wrote for the, 'Coin Index' page.

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

Lastly we added a link to each ‘CoinCard’, the link would take a user to a new component called ‘CoinShow’. ‘CoinShow’ would make another GET request to Nomics but this time it would use the id of a crypto currency from the request made on the ‘CoinIndex’ page to retrieve the data for the crypto currency that had been clicked.

While Tim set about formatting the API data in JSX to produce the ‘CoinCard‘ component and the 'Coin Show’ page, I began work on the Opportunity Cost Calculator, as this was beyond the scope of the brief and I was keen to confront the challenge of bringing a further element of interactivity and fun to the application.

## I Could Have Made What?

I wrote the series of operations to be performed for this feature as follows: 

- A form on the page captures the required data: 
    - the amount invested
    - the currency bought
    - the date of purchase
- the form data is passed as an argument to the `CalculateOpportunityLoss` function like so:

      const handleSubmit = async (event) => {
        event.preventDefault()
        const numberResult = await CalculateOpportunityLoss(formdata)
        setResult(parseInt(numberResult))
      }
      
- First, this function identifies the currency in question by looping through the API data with a 'while' loop until a currency matching the formdata is found:

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

- this function then processes the rest of the data into an API-friendly format:

      const relevantId = currencyId(formdata)
      const relevantStartDate = new Date(formdata.date)
      const formattedStartDate = relevantStartDate.toISOString()
      const relevantEndDate = new Date(formdata.date)
      const formattedEndDate = relevantEndDate.toISOString()

- The processed data is factored into a historic price GET request to the Nomics API, and the relevant value is extracted from the response:

      const getHistoricValue = async () => {
        const { data } = await axios.get(`https://cors.bridged.cc/https://api.nomics.com/v1/exchange-rates/history?key=${key}&currency=${relevantId}&start=${formattedStartDate}&end=${formattedEndDate}`)
        return data[0].rate
      }

- The opportunity cost (ie how much money the user could have made) is calculated from the current price, the historic price, and the amount invested:

      const calcNumericalResult = async () => {
        const currentValue = foundCurrency[0][0].price
        const historicValue = await getHistoricValue()

        return ((parseFloat(currentValue) / parseFloat(historicValue)) * parseFloat(formdata.amountInvested))
      }

- This result is sent back to the 'I Could Have Made What?' component where it is set into state and rendered beneath the form:

      <p className ="field">{result ? `You silly muppet! You could have made £${result}! If only you'd followed your hunches...` : '' }</p>

Unfortunately, what I didn't know when I started writing this feature is that historic data is only available for Bitcoin and Ethereum unless you buy a premium account with Nomics. This is why the while loop is overqualified for the job - I wrote this part before realising the feature would have to be limited to bitcoin and ethereum.

## Whats Hot?

Tim was responsible for implementing using the Twitter profiles of the top 5 cryptocurrencies and, I was responsible for creating the ‘Biggest Gainers and Losers’ functionality. When we created the application, Nomics were more relaxed about their request restrictions, but now they limit free accounts to 1 request per minute.

### Biggest Gainers and Losers

The following code for the biggest gainers and losers functionality was witten before the tighter restrictions, and allows for the first 600 cryptocurrencies to be analysed and ranked in order of 
 - a) largest percentage value gain in the last 24hrs
 - b) largest percentage value loss in the last 24hrs

        React.useEffect(() => {

          const getData = async () => {
            const requests = Array(6).fill(null).map((_, index) => getAllCoins(index + 1))

            const responses = await Promise.all(requests)
            const formattedResponse = responses.flatMap(res => res.data)
            
            formattedResponse.sort(compare)
            
            const firstTen = formattedResponse.slice(0, 10)
            const lastTen = formattedResponse.slice(formattedResponse.length - 10)

            setTen({
              first: firstTen,
              last: lastTen.reverse(),
            })
          }
          getData()

          const interval = setInterval(() => {
            getData()
          }, 5000)
          return () => clearInterval(interval)
        }, [])

The conpare argument passed to the sort function referenced in the above block is used to rank the currencies by percentage change, from highest to lowest. This is how it works:

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

Setting the first and last ten currencies in the sorted array is achieved after first defining `ten` as a React State:

    const [ten, setTen] = React.useState({
      first: [],
      last: [],
    })

Since the Nomics API is only apdated every ten seconds, setting the `getData()` function on a 5 second interval is sufficient to ensure the page is consistently updated with live data.

### Twitter Feed

Tim started by researching how we could embed the twitter profiles of the top 5 ranked crypto currencies on the page and found that an NPM package called ‘React Twitter Embed’ was the best way to do this.

## Challenges
We ran into a few challenges while building the Crypto Show App. The two biggest challenges would have were, firstly was converting the data captured from a user into a format that the Nomics API would accept. Secondly would have been some of the object keys used in the Nomics API had irregular naming conventions that conflicted with JavaScript like having a numeral at the start of a key name. It took a while to find a work around for this.

Wins
The biggest win for me was creating an end product that was really close to our intial plan. We did have to make a few comprises after finding out that working with a public API was not as straight forward as we initially thought.

This was the first pair coded project we had both undertaken. Dougal and I worked really well as a team and both brought different strengths to the table that allowed us to make a site that looked great and was packed full of functionality.

Learnings
The importance of good naming conventions when creating an API.
Carefully read API documentation.
When working in a team, learn from your team mates strengths especially when it comes to areas where you’re lacking in knowledge or you feel uncomfortable.
Future Features
If I had more time I would like to:

Update 'I Could Have What!!' page to search for more than two currencies.
Add more content to the 'Whats Hot? page.
