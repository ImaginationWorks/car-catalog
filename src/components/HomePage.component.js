import React from 'react';

import { Page } from './common';
import CarOfWeek from './car/CarOfTheWeek.component';

import './HomePage.styles.css';


export default () => (
  <Page id="homepage" className='homepage'>
    <p className='homepage__title'>Welcome to Car Catalog.</p>
    <CarOfWeek/>
  </Page>
);
