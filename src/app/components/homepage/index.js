import React from 'react';

import Page from '../page/index';
import CarOfWeek from '../car/carOfWeek';

import './index.css';


export default () => (
  <Page id="homepage" className='homepage'>
    <p className='homepage__title'>Welcome to Car Catalog.</p>
    <CarOfWeek/>
  </Page>
);
