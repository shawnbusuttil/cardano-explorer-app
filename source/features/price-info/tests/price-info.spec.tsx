import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { successMock } from './mocks/price-info.mock';
import { getPriceInfoError, getPriceInfoSuccess, server } from './mocks/server';

import PriceInfo from '../ui/PriceInfo';
import { cardanoToBTC } from '../util';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PriceInfo />
    </QueryClientProvider>
  );
};

test('should see the correct data when the request is correct so that the user is informed on the ADA market data', async () => {
  server.use(getPriceInfoSuccess);
  render(<App />);

  await waitFor(() => screen.getByText('Price'));

  expect(screen.getByText('Price')).toBeInTheDocument();
  expect(screen.getByText('Volume')).toBeInTheDocument();
  expect(screen.getByText('Market Cap')).toBeInTheDocument();
  expect(screen.getByText('Price Change (24H)')).toBeInTheDocument();

  const {
    data: {
      ADA: {
        quote: {
          USD: { price, volume_24h, market_cap, percent_change_24h },
        },
      },
    },
  } = successMock;

  expect(screen.getByTestId('Price').textContent).toEqual(
    `$${price.toFixed(2)} @ ${cardanoToBTC(price)} BTC`
  );
  expect(screen.getByTestId('Volume').textContent).toEqual(
    volume_24h.toLocaleString()
  );
  expect(screen.getByTestId('Market Cap').textContent).toEqual(
    `$${market_cap.toLocaleString()}`
  );
  expect(screen.getByTestId('Price Change (24H)').textContent).toEqual(
    `${percent_change_24h.toFixed(2)}%`
  );
});

test('should see error feedback when the request fails to fetch the data', async () => {
  server.use(getPriceInfoError);
  render(<App />);

  await waitFor(() => screen.getByTestId('market-error'));

  expect(screen.queryByText('Price')).not.toBeInTheDocument();
  expect(screen.queryByText('Volume')).not.toBeInTheDocument();
  expect(screen.queryByText('Market Cap')).not.toBeInTheDocument();
  expect(screen.queryByText('Price Change (24H)')).not.toBeInTheDocument();

  expect(screen.getByText(`Couldn't load market data.`)).toBeInTheDocument();
});
