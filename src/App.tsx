import { useEffect, useState } from 'react';
import './App.css';
// import { getHistoricalExchangeRates } from './api';
import axios from "axios";

// interface ExchangeRate {
//   date: string;
//   EGP: number;
//   CAD: number;
// }

function App() {
  // const [startDate, setStartDate] = useState<string>("");
  // const [endDate, setEndDate] = useState<string>("");
  // const formateStartDate = startDate.split('-').join('/');
  // const formattedEndDate = endDate.split('-').join('/');
  // const targetCurrencies: string[] = ["EGP", "CAD"];
  // const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);


  const [pricesData, setPricesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");


  // useEffect(() => {
  //   if (formateStartDate && formattedEndDate) {
  //     const generateDateRange = (start: string, end: string): string[] => {
  //       const dateArray: string[] = [];
  //       const currentDate = new Date(start);

  //       while (currentDate <= new Date(end)) {
  //         dateArray.push(currentDate.toISOString().split('T')[0].split('-').join('/'));
  //         currentDate.setDate(currentDate.getDate() + 1);
  //       }

  //       return dateArray;
  //     };

  //     const fetchExchangeRates = async () => {
  //       try {
  //         const dateRange = generateDateRange(formateStartDate, formattedEndDate);

  //         const exchangeRatesPromises = dateRange.map(async (date) => {
  //           const rates = await getHistoricalExchangeRates("USD", targetCurrencies, date);
  //           return { date, ...rates } as ExchangeRate;
  //         });

  //         const resolvedExchangeRates = await Promise.all(exchangeRatesPromises);
  //         setExchangeRates(resolvedExchangeRates);
  //       } catch (error) {
  //         console.error('Error fetching exchange rates:', error);
  //       }
  //     };

  //     fetchExchangeRates();

  //   }
  // }, [startDate, endDate]);



  const getCurrencyExchangeRates = async () => {
    try {
      const responseCurrencyExchangeRates = await axios.get(
        "https://v6.exchangerate-api.com/v6/f1a76583ccde513b0d830566/latest/USD"
      );
      const ExchangePrices = responseCurrencyExchangeRates.data.conversion_rates;
      setPricesData(ExchangePrices);
    } catch (error) {
      console.error("Error in fetching currency exchange rates:", error);
    }
  };

  useEffect(() => {
    getCurrencyExchangeRates();
  }, []);


  return (
    <>
      <div className='container'>
        {/* <h1>Currency exchange rates dates</h1>
        <form>
          <div className="input-group">
            <label htmlFor="startDate">Start Date:</label>
            <input type='date' id="startDate" value={startDate} onChange={(date) => setStartDate(date.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date:</label>
            <input type='date' id="endDate" value={endDate} onChange={(date) => setEndDate(date.target.value)} required />
          </div>
        </form> */}
        {/* Currency exchange table  */}
        {/* <table>
          <caption>
            {`Currency exchange table ${exchangeRates && startDate && endDate ? `from ${startDate} to ${endDate}` : ""} `}
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">EGP</th>
              <th scope="col">CAD</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.EGP.toFixed(3)}</td>
                <td>{row.CAD.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        {/* Currency Exchange Rates Compared to USD */}
        <h1>Currency Exchange Rates Compared to USD</h1>
        <div className="input-group">
          <label htmlFor="searchCurrency">Search Currency:</label>
          <input
            placeholder='EGP'
            type="text"
            id="searchCurrency"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {
          pricesData && (
            <table>
              <caption>
                Currency exchange table
              </caption>
              <thead>
                <tr>
                  <th scope="col">currency</th>
                  <th scope="col">Exchange rate now</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm === "" ?
                  Object.entries(pricesData).map(([currency, exchangeRate], index) => (
                    <tr key={index}>
                      <td>{currency}</td>
                      <td>{exchangeRate}</td>
                    </tr>
                  ))
                  : Object.entries(pricesData)
                    .filter(([currency]) => currency.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(([currency, exchangeRate], index) => (
                      <tr key={index}>
                        <td>{currency}</td>
                        <td>{exchangeRate}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          )
        }

      </div>
    </>
  );
}

export default App;
