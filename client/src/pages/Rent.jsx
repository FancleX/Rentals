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

const queryString = require('query-string');
const googleMap = new GeoCoder();


class Rent extends Component {

  async componentDidMount() {
    const { search } = this.props.router.location;
    const params = queryString.parse(search);
    const { location } = params;

    if (params.location === 'all' || !Validation.generalStringValidation(location)) {
      // Todo: give top search 100
      console.log(1)
      return;
    }

    const { boundary } = params;

    try {
      const result = await googleMap.getCoordinates(location);
      console.log(result)
    } catch (error) {
      // Todo: handle query error

    }
  }

  render() {
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
          <HouseList />
        </Box>
      </div>
    )
  }
}

export default withRouter(Rent);