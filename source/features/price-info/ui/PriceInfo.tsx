import React, { useMemo } from 'react';

import styles from './PriceInfo.module.scss';

import { useListingData } from '../hooks/useListingData';
import { cardanoToBTC } from '../util';

import CardanoLogo from '../../../public/assets/images/header/cardano-logo.svg';
import { Card } from '../../../widgets/card/Card';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

const PriceInfo = () => {
  const { data, error, isLoading } = useListingData();

  const items = useMemo(
    () => [
      {
        title: 'Price',
        content:
          data && `$${data.price.toFixed(2)} @ ${cardanoToBTC(data.price)} BTC`,
      },
      {
        title: 'Market Cap',
        content: data && `$${data.market_cap.toLocaleString()}`,
      },
      {
        title: 'Volume',
        content: data && `${data.volume_24h.toLocaleString()}`,
      },
      {
        title: 'Price Change (24H)',
        content: data && `${data.percent_change_24h.toFixed(2)}%`,
      },
    ],
    [data]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return !error ? (
    <div className={styles.priceInfo}>
      {items.map((item) => (
        <Card
          title={item.title}
          content={item.content || `Couldn't fetch data.`}
          key={item.title}
          icon={<CardanoLogo className={styles.icon} />}
        />
      ))}
    </div>
  ) : (
    <p data-testid="market-error" className={styles.error}>
      Couldn't load market data.
    </p>
  );
};

export default PriceInfo;
