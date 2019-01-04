import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Loading } from '../common';

import './CarDetails.styles.css';


class CarDetails extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const newCarId = nextProps.car ? nextProps.car.id : null;
    const currentCarId = this.props.car ? this.props.car.id : null;
    return newCarId !== currentCarId;
  }

  render() {
    const { car } = this.props;
    if (!car) {
      return <Loading/>;
    }

    return (
      <div key={car.id} className="car-details col-md-4 col-sm-6">
        <p className='car-details__item car-details__item_maker'>
          <span className='car-details__item-title'>Maker:</span>
          <span className='car-details__item-value'>{car.maker.name}</span>
        </p>
        <p className='car-details__item car-details__item_name'>
          <span className='car-details__item-title'>Name:</span>
          <span className='car-details__item-value'>{car.name}</span>
        </p>
        <p className='car-details__item car-details__item_price'>
          <span className='car-details__item-title'>Price:</span>
          <span className='car-details__item-value car-details__item-value_price'>{car.price}</span>
        </p>
        <p className='car-details__item car-details__item_image'>
          <img src={car.imageUrl} alt={car.name} style={{ width: '400px' }} />
        </p>
        {car.review &&
          <p className='car-details__item car-details__item_review'>
            <span className='car-details__item-title'>Editor's Review:</span>
            <span className='car-details__item-value'>{car.review}</span>
          </p>
        }
      </div>
    );
  }
}


export default CarDetails;
