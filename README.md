### POC: Cardano Explorer App Modification (Price Info)

For my feature, I decided to implement an example/mock of price data coming from CoinMarketCap. This is similar to Ethereum's EthScan blockchain explorer (https://etherscan.io/) as well as Polygon's (https://polygonscan.com/) blockchain explorer of the data that sits under the search bar.

Some important bits you should know before running this:

The `docker-compose` on the `cardano-graphql` project has failed due to the following error:

```
#9 1.298 W: GPG error: http://archive.ubuntu.com/ubuntu focal-backports InRelease: At least one invalid signature was encountered.
#9 1.298 E: The repository 'http://archive.ubuntu.com/ubuntu focal-backports InRelease' is not signed.
------
executor failed running [/bin/sh -c apt-get update && apt-get install curl -y &&  curl --proto '=https' --tlsv1.2 -sSf -L https://deb.nodesource.com/setup_${NODEJS_MAJOR_VERSION}.x | bash - &&  apt-get install nodejs -y]: exit code: 100
ERROR: Service 'cardano-graphql' failed to build : Build failed
```

Which means the GraphQL client on `cardano-explorer` wasn't connecting to localhost:3100 and was failing to load the graphql data needed to render the blockchain transactions. The dev environment was met with an unhandled runtime GraphQL exception.

Due to limited time, I took the decision not to pursue this and instead set a few workarounds in place, such as turning off the primary `jest.config` in the jest setup file in order to run my tests in isolation.

I used `react-query` and a proxy ***which you should switch on*** prior to running `yarn dev`, otherwise you will get CORS errors trying to fetch from the CoinMarketCap API through `localhost`. And as a consequence, all operations in the following step 2 would fail if the proxy is inactive.

1) `yarn proxy`
2) `yarn dev` | `yarn test` | `yarn storybook`


### Possible Improvements:

- Placeholders for loading UI.
- Market data rendering decoupling in isolation. (e.g. if price is available, and volume is down).
- Translations for my content.
- Updating market data dynamically through polling and observables.
- Dynamically updating BTC price.
- Content coming from CDN.


====================

====================
[![Tests](https://github.com/input-output-hk/cardano-explorer-app/workflows/Tests/badge.svg)](https://github.com/input-output-hk/cardano-explorer-app/actions?query=workflow%3ATests)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A React app with GraphQL client interfacing with [Cardano GraphQL](https://github.com/input-output-hk/cardano-graphql).

### Environment Variables
See [environment](source/environment.ts) for defaults.
- `CARDANO_ERA`
- `CARDANO_NETWORK`
- `GRAPHQL_API_PROTOCOL`
- `GRAPHQL_API_HOST`
- `GRAPHQL_API_PORT`
- `GRAPHQL_API_PATH`
- `POLLING_INTERVAL`
- `GA_TRACKING_ID`
- `DEBUG`

## Build
This project uses an offline package cache to enable reproducible builds.

### yarn
```console
yarn --offline && yarn static:build
```

### nix
``` console
nix-build -A cardano-explorer-app
```
## Deploy
The static bundle can be deployed using a standard web server. A simple [Node.js program](deploy/index.js) 
is available for deploying the build to an AWS S3 bucket.

```console
AWS_ACCESS_KEY_ID=your_access_key_id \
AWS_SECRET_ACCESS_KEY=your_secret_access_key node \
./deploy/example_deployment.js
```

## Development
The environment is configured to access a remote managed deployment of the API, 
however you can run a local stack using Docker and use a `.env` to work offline. 
See [.env.example](.env.example)

### `yarn dev`
- Starts the development version of the app by default at http://localhost:4000
- Generates graphql typings from the referenced schema in [`@cardano-graphql/client-ts`](https://github.com/input-output-hk/cardano-graphql/tree/master/packages/client-ts) 
and documents within the codebase.
- Any changes to graphql documents will trigger the TypeScript generator.

###  Storybook

All visual components should be developed in Storybook first.

### `yarn storybook`

### Continuous Deployment
The `master` and `develop` branches are continuously deployed, with PRs creating merge previews to assist with review:
#### Mainnet
[![Netlify Status](https://api.netlify.com/api/v1/badges/09492acb-61fd-4745-8b0e-60c8886f60d1/deploy-status)](https://cardano-explorer-mainnet.netlify.app)
#### Testnet
[![Netlify Status](https://api.netlify.com/api/v1/badges/16628b5d-b1f2-429b-a707-bbdec0564fe9/deploy-status)](https://cardano-explorer-testnet.netlify.app)
