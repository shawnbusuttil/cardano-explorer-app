/* TODO: In prod, you would use the CoinMarketCap ADA/BTC market pair GET. */

const MOCK_BTC_VALUE = 60000;

export const cardanoToBTC = (value: number) => {
  return (value / MOCK_BTC_VALUE).toFixed(5);
};
