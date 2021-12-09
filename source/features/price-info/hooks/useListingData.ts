import { useQuery, UseQueryResult } from 'react-query';

import getListingData from '../api/getListingData';
import { IListingInfo } from '../types';

export const useListingData = (
  symbol = 'ADA'
): UseQueryResult<IListingInfo> => {
  return useQuery('coin-listing', async () => {
    const response = await getListingData(symbol);

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { data } = await response.json();
    const {
      quote: {
        USD: { price, market_cap, volume_24h, percent_change_24h },
      },
    } = data[symbol];

    return {
      market_cap,
      percent_change_24h,
      price,
      symbol,
      volume_24h,
    };
  });
};
