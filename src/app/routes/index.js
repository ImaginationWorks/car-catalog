import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import NotFound from '../components/not-found';


const Homepage = Loadable({
  loader: () => import('../components/homepage'),
  loading: () => null,
  modules: ['homepage']
});

const Cars = Loadable({
  loader: () => import('../components/car'),
  loading: () => null,
  modules: ['cars']
});

const CarDetails = Loadable({
  loader: () => import('../components/car/carSelected'),
  loading: () => null,
  modules: ['cars']
});


export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/cars" component={Cars} />
    <Route exact path="/cars/:id" component={CarDetails} />
    <Route exact path="/search" component={Cars} />
    <Route component={NotFound} />
  </Switch>
);
