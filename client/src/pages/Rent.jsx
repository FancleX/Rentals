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
import withRouter from '../components/withRouter';

const queryString = require('query-string');

class Rent extends Component {

  componentDidMount() {
    const { search } = this.props.router.location;
    const params = queryString.parse(search);
    const { location } = params;
    console.log(params)
    
    if (location === 'all') {
      // Todo: give top search 100
      return;
    }

    

  };

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