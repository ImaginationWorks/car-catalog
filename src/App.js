import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './Header';
import Routes from './routes';

import './App.css';


class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="app">
        <Header
          current={location.pathname}
        />
        <div id="content" className='app-content'>
          <Routes />
        </div>
      </div>
    );
  }
}


export default withRouter(App);
