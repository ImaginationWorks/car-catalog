import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  carsSelector,
  carMakersSelector,
  modelsOfMakerSelector
} from '../../../redux/selectors/car.selector';
import {
  fetchMakers,
  fetchModelsOfMaker
} from '../../../services/car.service';

import Page from '../page';
import Loading from '../common/loading';

import './search.css';


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

  componentDidUpdate() {
    const {
      filters: { selectedMakerId, selectedModelId },
      search: { fired }
    } = this.state;
    if (fired && selectedMakerId !== defaultSelectedValue && selectedModelId !== defaultSelectedValue) {
      this.props.history.push(`/make/models/${selectedModelId}`);
    }
  }

  componentDidMount() {
    this._searchCars = _.debounce(this._searchCars, timeOutInterval);
  }

  render() {
    const { makers, modelsOfMaker } = this.props;
    if (_.isEmpty(makers) && !modelsOfMaker) {
      return <Loading/>;
    }

    const { filters: { selectedMakerId, selectedModelId }, search: { enabled } } = this.state;

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
  ...carsSelector(state),
  ...carMakersSelector(state),
  ...modelsOfMakerSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchMakers, fetchModelsOfMaker }, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCar)
