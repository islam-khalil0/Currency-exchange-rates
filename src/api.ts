import axios, { AxiosResponse } from "axios";

const API_KEY = "f1a76583ccde513b0d830566";
const BASE_URL = "https://open.er-api.com/v6/";

interface ExchangeRatesResponse {
  rates: { [key: string]: number };
}

export const getHistoricalExchangeRates = async (
  baseCurrency: string,
  targetCurrencies: string[],
  date: string
): Promise<{ [key: string]: number }> => {
  try {
    const response: AxiosResponse<ExchangeRatesResponse> = await axios.get(
      `${BASE_URL}historical/${date}/${baseCurrency}?apikey=${API_KEY}`
    );

    const rates = response.data.rates;

    const exchangeRates = targetCurrencies.reduce(
      (result: { [key: string]: number }, currency: string) => {
        result[currency] = rates[currency];
        return result;
      },
      {}
    );

    return exchangeRates;
  } catch (error) {
    // Log or handle the error appropriately
    console.error("Error fetching historical exchange rates:", error);
    throw error;
  }
};
