import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  CarOfTheWeekSelector
} from '../../selectors';
import {
  fetchCarOfWeek
} from '../../services';

import { Page } from '../common';
import CarDetails from './CarDetails.component';

import './CarOfTheWeek.styles.css';


class CarOfTheWeekComponent extends Component {
  static propTypes = {
    carOfWeek: PropTypes.object.isRequired,
    fetchCarOfWeek: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchCarOfWeek();
  }

  render() {
    const { carOfWeek } = this.props;
    return (
      <Page
        id='carOfWeek'
        className='car-of-the-Week'
        title='Car of the week'
        description={`Car of the week`}
      >
        <p className='car-of-the-Week__title'>Here is the Car of this week.</p>
        <CarDetails car={carOfWeek}/>
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  ...CarOfTheWeekSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCarOfWeek }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarOfTheWeekComponent);
