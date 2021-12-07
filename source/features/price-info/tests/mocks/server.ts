import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { errorMock, successMock } from './price-info.mock';

import { API_URL } from '../../config';

const getPriceInfoSuccess = rest.get(
  `${API_URL}/quotes/latest?symbol=ADA`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successMock));
  }
);

const getPriceInfoError = rest.get(
  `${API_URL}/quotes/latest?symbol=ADA`,
  (req, res, ctx) => {
    return res(ctx.status(403), ctx.json(errorMock));
  }
);

const server = setupServer();

export { server, rest, getPriceInfoSuccess, getPriceInfoError };
