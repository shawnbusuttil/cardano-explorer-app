import fetch from 'isomorphic-fetch';

import { server } from './mocks/server';

const typedGlobal = globalThis;

const defaultFetch = typedGlobal.fetch;

beforeAll(() => {
  typedGlobal.fetch = fetch;
  server.listen({
    onUnhandledRequest: 'bypass',
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  typedGlobal.fetch = defaultFetch;
});
