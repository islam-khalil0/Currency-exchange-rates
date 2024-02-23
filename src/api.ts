import axios from "axios";

const API_KEY = "f1a76583ccde513b0d830566";
const BASE_URL = "https://open.er-api.com/v6/";

export const getHistoricalExchangeRates = async (
  baseCurrency: string,
  targetCurrencies: string[],
  date: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}historical/${date}/${baseCurrency}?apikey=${API_KEY}`
    );
    const rates = response.data.rates;

    const exchangeRates = targetCurrencies.reduce((result, currency) => {
      result[currency] = rates[currency];
      return result;
    }, {});

    return exchangeRates;
  } catch (error) {
    throw error;
  }
};
