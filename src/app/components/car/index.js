import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import _ from 'lodash';

import {
  carsSelector,
  carMakersSelector,
  modelsOfMakerSelector
} from '../../../redux/selectors/car.selector';
import {
  fetchCars,
  fetchMakers,
  fetchModelsOfMaker
} from '../../../services/car.service';

import Page from '../page';
import Loading from '../common/loading';

import './index.css';


// Do not call search cars API more than 1 time in 300 ms.
const timeOutInterval = 300;

const CarDetailsLink = ({ to, text }) => (
  <li className='search-result-list__car-details-link'>
    <Link to={to}>{text}</Link>
  </li>
);

class Cars extends Component {
  static propTypes = {
    cars: PropTypes.object.isRequired,
    makers: PropTypes.object.isRequired,
    modelsOfMaker: PropTypes.object.isRequired,
    fetchCars: PropTypes.func.isRequired,
    fetchMakers: PropTypes.func.isRequired,
    fetchModelsOfMaker: PropTypes.func.isRequired
  };

  state = {
    selectedMakerId: undefined,
    selectedModelId: undefined,
  };

  componentWillMount() {
    this.props.fetchMakers();
  }

  componentDidMount() {
    this._searchCars = _.debounce(this._searchCars, timeOutInterval);
  }

  render() {
    const { cars, makers, modelsOfMaker } = this.props;
    if (_.isEmpty(makers) && !modelsOfMaker) {
      return <Loading/>;
    }

    const { selectedMakerId, selectedModelId } = this.state;

    return (
      <Page
        id="cars"
        title='Cars'
        className='Cars page'
        description={`Car list Page`}
      >
        <p className='car-list-page__title'>Find your next car, please filter by maker and model.</p>
        <div className="search col-md-8 col-xs-12">
          <div className='search__criteria search__criteria_maker col-md-4 col-xs-12'>
            <span className='search__criteria_title'>Maker: </span>
            <select className='search__criteria_value' onChange={this._onFilterSelectedMakerIdChange} value={selectedMakerId}>
              <option value={-1}>All</option>
              {_.map(makers, function (maker, index) {
                return <option key={index} value={maker.id}>{_.capitalize(maker.name)}</option>;
              })}
            </select>
          </div>

          <div className='search__criteria search__criteria_model col-md-4 col-xs-12'>
            <span className='search__criteria_title'>Model: </span>
            <select className='search__criteria_value' onChange={this._onFilterSelectedModelIdChange} value={selectedModelId}>
              <option value={-1}>All</option>
              {_.map(modelsOfMaker, function (model, index) {
                return <option key={index} value={model.id}>{_.capitalize(model.name)}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="search-result col-md-8 col-xs-12">
          <ul className='search-result-list'>
            {cars.map((car, index) => {
              return <CarDetailsLink key={index} to={`/make/models/${car.id}`} text={`${car.maker.name} - ${car.name}`} />;
            })}
          </ul>
        </div>
      </Page>
    );
  }

  _searchCars = () => {
    const { fetchCars } = this.props;
    const { selectedMakerId, selectedModelId } = this.state;
    fetchCars({ makerId: selectedMakerId === -1 ? undefined : selectedMakerId, modelId: selectedModelId === -1 ? undefined : selectedModelId });
  };

  _onFilterSelectedMakerIdChange = (event) => {

    const makerId = event.target.value;
    const selectedMakerId = makerId === -1 ? -1 : makerId;
    const selectedModelId = -1;


    this.setState({
      selectedMakerId,
      selectedModelId
    });

    this.props.fetchModelsOfMaker(makerId);
    this._searchCars();
  };

  _onFilterSelectedModelIdChange = (event) => {
    const selectedModelId = event.target.value;
    this.setState({
      selectedModelId
    });
    this._searchCars();
  };
}

const mapStateToProps = (state) => ({
  ...carsSelector(state),
  ...carMakersSelector(state),
  ...modelsOfMakerSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCars, fetchMakers, fetchModelsOfMaker }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars)
