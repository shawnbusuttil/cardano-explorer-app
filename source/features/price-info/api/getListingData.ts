import { API_URL } from '../config';

const PATH = 'quotes/latest';

const getListingData = async (symbol: string) => {
  return fetch(`${API_URL}/${PATH}?symbol=${symbol}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': 'd318809c-ebdf-46d1-bce5-cd63c9bc6ab5',
    },
    method: 'GET',
  });
};

export default getListingData;
