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
    filters: {
      selectedMakerId: undefined,
      selectedModelId: undefined,
    },
    searchEnabled: false
  };

  componentWillMount() {
    this.props.fetchMakers();
  }

  componentDidMount() {
    this._searchCars = _.debounce(this._searchCars, timeOutInterval);
  }

  render() {
    const { cars, makers, modelsOfMaker } = this.props;
    if (!makers && !modelsOfMaker && !cars) {
      return <Loading/>;
    }

    const { filters: { selectedMakerId, selectedModelId }, searchEnabled } = this.state;

    return (
      <Page
        id="cars"
        title='Cars'
        className='search-page'
        description={`Car Search Page`}
      >
        <p className='search-page__title'>Please select the maker and model to search</p>
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
          <button type="button" className='search__button btn btn-info col-md-4 col-xs-12' disabled={!searchEnabled} onClick={this._onSearchButtonClick}>Search</button>
        </div>
        <div className="search-result col-md-8 col-xs-12">
          <ul className='search-result-list'>
            {cars.map((car, index) => {
              return <CarDetailsLink key={index} to={`/cars/${car.id}`} text={`${car.maker.name} - ${car.name}`} />;
            })}
          </ul>
        </div>
      </Page>
    );
  }

  _searchCars = () => {
    const { fetchCars } = this.props;
    const { filters: { selectedMakerId, selectedModelId } } = this.state;
    fetchCars({ makerId: selectedMakerId === -1 ? undefined : selectedMakerId, modelId: selectedModelId === -1 ? undefined : selectedModelId });
  };

  _onFilterSelectedMakerIdChange = (event) => {
    const { filters } = this.state;

    const makerId = event.target.value;
    filters.selectedMakerId = makerId;
    filters.selectedMakerId = makerId === -1 ? -1 : filters.selectedMakerId;
    filters.selectedModelId = -1;

    const searchEnabled = false;

    this.setState({
      filters,
      searchEnabled: searchEnabled
    });

    this.props.fetchModelsOfMaker(makerId);
  };

  _onFilterSelectedModelIdChange = (event) => {
    const { filters } = this.state;
    const modelId = event.target.value;
    filters.selectedModelId = modelId;
    const searchEnabled = modelId !== -1 && filters.selectedMakerId !== -1;
    this.setState({
      filters,
      searchEnabled: searchEnabled
    });
  };

  _onSearchButtonClick = () => {
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
