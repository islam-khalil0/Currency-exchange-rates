import { useEffect, useState } from 'react';
import './App.css';
import { getHistoricalExchangeRates } from './api';

interface ExchangeRate {
  date: string;
  EGP: number;
  CAD: number;
}

function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const targetCurrencies: string[] = ["EGP", "CAD"];
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      const generateDateRange = (start: string, end: string): string[] => {
        const dateArray: string[] = [];
        const currentDate = new Date(start);

        while (currentDate <= new Date(end)) {
          dateArray.push(currentDate.toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
      };

      const fetchExchangeRates = async () => {
        try {
          const dateRange = generateDateRange(startDate, endDate);

          const exchangeRatesPromises = dateRange.map(async (date) => {
            const rates = await getHistoricalExchangeRates("USD", targetCurrencies, date);
            return { date, ...rates } as ExchangeRate;
          });

          const resolvedExchangeRates = await Promise.all(exchangeRatesPromises);
          setExchangeRates(resolvedExchangeRates);
        } catch (error) {
          console.error('Error fetching exchange rates:', error);
        }
      };

      fetchExchangeRates();
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className='container'>
        <h1>Currency Exchange Rates</h1>
        <form>
          <div className="input-group">
            <label htmlFor="startDate">Start Date:</label>
            <input type='date' id="startDate" value={startDate} onChange={(date) => setStartDate(date.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date:</label>
            <input type='date' id="endDate" value={endDate} onChange={(date) => setEndDate(date.target.value)} required />
          </div>
        </form>
        {/* Currency exchange table  */}
        <table>
          <caption>
            {`Currency exchange table ${startDate && endDate ? `from ${startDate} to ${endDate}` : ""} `}
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
        </table>
      </div>
    </>
  );
}

export default App;
