import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './header';
import Routes from './routes';

import './app.css';


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
