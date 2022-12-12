import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PriceFilter from '../components/PriceFilter';
import SearchBar from '../components/SearchBar';
import Box from '@mui/material/Box';
import BedBathFilter from '../components/BedBathFilter';
import HomeTypeFilter from '../components/HomeTypeFilter';
import SavedHomeButton from '../components/SavedHomeButton';
import HouseList from '../components/HouseList';
import withRouter from '../hooks/withRouter';
import GeoCoder from '../utils/Geocoder.ts';
import Validation from '../utils/Validation';
import { connect } from 'react-redux';
import { searchPreview, searchSpecific } from '../redux/reducers/propertyReducer';

const queryString = require('query-string');
const googleMap = new GeoCoder();


class Rent extends Component {

  async componentDidMount() {
    const { search } = this.props.router.location;
    const params = queryString.parse(search);
    const { location } = params;
    const { searchPreview, searchSpecific } = this.props;

    if (params.location === 'all' || !Validation.generalStringValidation(location)) {
      await searchPreview();
      return;
    }

    const { boundary } = params;

    try {
      const { lng, lat } = await googleMap.getCoordinates(location);
      const data = { lng, lat, boundary };
      await searchSpecific(data);
    } catch (error) {
      // Todo: handle query error
      const { alert: { setAlert } } = this.props;
      setAlert(error, 'error');
    }
  }

  render() {
    // const { cards, userPreference } = this.state;
    const { cards } = this.props;
    console.log(this.props)

    return (
      <div style={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1, marginTop: '75px' }}>
          <AppBar position="static" style={{ width: '100%', backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid grey', padding: '10px' }}>
            <Toolbar>
              <SearchBar />
              <PriceFilter />
              <BedBathFilter />
              <HomeTypeFilter />
              <SavedHomeButton />
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ width: '100%' }}>
          <HouseList cards={cards} type={'query'} />
        </Box>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.property.searchList,
});

const mapDispatchToProps = (dispatch) => ({
  searchPreview: () => dispatch(searchPreview()),
  searchSpecific: (data) => dispatch(searchSpecific(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Rent));
