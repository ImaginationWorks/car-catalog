import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  CarsSelector,
  CarMakersSelector,
  CarModelsOfMakerSelector
} from '../../selectors';
import {
  fetchMakers,
  fetchModelsOfMaker
} from '../../services';

import { Loading, Page } from '../common';

import './CarSearch.styles.css';


// Do not call search cars API more than 1 time in 300 ms.
const timeOutInterval = 300;

const defaultSelectedValue = '-1';

class SearchCar extends Component {
  static propTypes = {
    cars: PropTypes.object.isRequired,
    makers: PropTypes.object.isRequired,
    modelsOfMaker: PropTypes.object.isRequired,
    fetchMakers: PropTypes.func.isRequired,
    fetchModelsOfMaker: PropTypes.func.isRequired
  };

  state = {
    filters: {
      selectedMakerId: defaultSelectedValue,
      selectedModelId: defaultSelectedValue,
    },
    search: {
      enabled: false,
      fired: false
    }
  };

  componentWillMount() {
    this.props.fetchMakers();
  }

  componentDidMount() {
    this._searchCars = _.debounce(this._searchCars, timeOutInterval);
  }

  render() {
    const { makers, modelsOfMaker } = this.props;
    if (_.isEmpty(makers) && !modelsOfMaker) {
      return <Loading/>;
    }

    const { filters: { selectedMakerId, selectedModelId }, search: { enabled, fired } } = this.state;

    if (fired && selectedMakerId !== defaultSelectedValue && selectedModelId !== defaultSelectedValue) {
      return <Redirect to={`/make/models/${selectedModelId}`}/>
    }

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
              <option value={defaultSelectedValue}>All</option>
              {_.map(makers, function (maker, index) {
                return <option key={index} value={maker.id}>{_.capitalize(maker.name)}</option>;
              })}
            </select>
          </div>

          <div className='search__criteria search__criteria_model col-md-4 col-xs-12'>
            <span className='search__criteria_title'>Model: </span>
            <select className='search__criteria_value' onChange={this._onFilterSelectedModelIdChange} value={selectedModelId}>
              <option value={defaultSelectedValue}>All</option>
              {_.map(modelsOfMaker, function (model, index) {
                return <option key={index} value={model.id}>{_.capitalize(model.name)}</option>;
              })}
            </select>
          </div>
          <button type="button" className='search__button btn btn-info col-md-4 col-xs-12' disabled={!enabled} onClick={this._onSearchButtonClick}>Search</button>
        </div>
      </Page>
    );
  }

  _searchCars = () => {
    const { search } = this.state;
    search.fired = true;
    this.setState({
      search
    });
  };

  _onFilterSelectedMakerIdChange = (event) => {
    const { filters, search } = this.state;

    filters.selectedMakerId = event.target.value;
    filters.selectedModelId = defaultSelectedValue;
    search.enabled = false;

    this.setState({
      filters,
      search
    });

    this.props.fetchModelsOfMaker(
      filters.selectedMakerId === defaultSelectedValue ? undefined : filters.selectedMakerId
    );
  };

  _onFilterSelectedModelIdChange = (event) => {
    const { filters, search } = this.state;
    const modelId = event.target.value;
    filters.selectedModelId = modelId;
    search.enabled = modelId !== defaultSelectedValue &&
      filters.selectedMakerId !== defaultSelectedValue;
    this.setState({
      filters,
      search
    });
  };

  _onSearchButtonClick = () => {
    this._searchCars();
  };
}

const mapStateToProps = (state) => ({
  ...CarsSelector(state),
  ...CarMakersSelector(state),
  ...CarModelsOfMakerSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchMakers, fetchModelsOfMaker }, dispatch);


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCar))
