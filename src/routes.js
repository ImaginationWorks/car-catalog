import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import {
  NotFound as NotFoundComponent
} from './components';


const HomePageComponent = Loadable({
  loader: () => import('./components/HomePage.component'), // HomePage,
  loading: () => null,
  modules: ['homepage']
});

const CarsComponent = Loadable({
  loader: () =>  import('./components/car/Cars.component'), // Cars,
  loading: () => null,
  modules: ['cars']
});

const CarSearchComponent = Loadable({
  loader: () =>  import('./components/car/CarSearch.component'), // CarSearch,
  loading: () => null,
  modules: ['cars']
});

const CarSelectedComponent = Loadable({
  loader: () =>  import('./components/car/CarSelected.component'), // CarSelected,
  loading: () => null,
  modules: ['cars']
});


export default () => (
  <Switch>
    <Route exact path="/" component={HomePageComponent} />
    <Route exact path="/cars" component={CarsComponent} />
    <Route exact path="/make/models/:id" component={CarSelectedComponent} />
    <Route exact path="/search" component={CarSearchComponent} />
    <Route component={NotFoundComponent} />
  </Switch>
);
