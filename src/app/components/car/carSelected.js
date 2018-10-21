import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  carSelectedSelector
} from '../../../redux/selectors/car.selector';
import {
  fetchCar
} from '../../../services/car.service';

import Page from "../page";
import CarDetails from './details';

import './carSelected.css';


class CarSelected extends Component {
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
        <CarDetails car={carSelected} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  ...carSelectedSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCar }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarSelected);
