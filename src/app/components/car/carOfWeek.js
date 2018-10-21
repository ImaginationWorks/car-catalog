import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  carOfWeekSelector
} from '../../../redux/selectors/car.selector';
import {
  fetchCarOfWeek
} from '../../../services/car.service';

import Page from '../page';
import CarDetails from './details';

import './carOfWeek.css';


class CarOfWeek extends Component {
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
  ...carOfWeekSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCarOfWeek }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarOfWeek);
