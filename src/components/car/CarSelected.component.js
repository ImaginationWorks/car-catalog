import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  CarSelectedSelector
} from '../../selectors';
import {
  fetchCar
} from '../../services';

import { Page } from '../common';
import CarDetails from './CarDetails.component';

import './CarSelected.styles.css';


class CarSelectedComponent extends Component {
  static propTypes = {
    carSelected: PropTypes.object.isRequired,
    fetchCar: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchCar(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchCar(nextProps.match.params.id);
    }

    return true;
  }

  render() {
    const { carSelected } = this.props;
    return (
      <Page
        id="carSelected"
        title='Car Selected'
        className='car-selected'
        description={`Car Selected Page`}
      >
        <p className='car-selected__title'>Here is the details of the selected car.</p>
        <CarDetails car={carSelected} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  ...CarSelectedSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCar }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarSelectedComponent);
