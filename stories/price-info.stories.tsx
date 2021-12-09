import { storiesOf } from '@storybook/react';
import React from 'react';

import { QueryClientDecorator } from './support/QueryClientDecorator';

import PriceInfo from '../source/features/price-info/ui/PriceInfo';

storiesOf('Price Info', module)
  .addDecorator((story) => (
    <QueryClientDecorator>{story()}</QueryClientDecorator>
  ))
  .add('Price Info', () => <PriceInfo />);
