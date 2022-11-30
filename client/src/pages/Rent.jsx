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
import withAlert from '../hooks/withAlert';

const queryString = require('query-string');
const googleMap = new GeoCoder();


class Rent extends Component {

  state = {
    // preview data
    cards: [
      {
        id: 3,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        location: {
          communityName: 'xxx park',
          street: 'xxx street',
          city: 'portland',
          state: 'maine',
          zipCode: '041111'
        },
        entity: {
          type: 'apartment',
          price: 3000,
          beds: 3,
          baths: 1,
          area: 900,
          postDate: '11/16/2022',
          yearBuilt: 1999
        },
        source: {
          inNetwork: true
        }
      },
      {
        id: 1,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        location: {
          communityName: 'xxx park',
          street: 'xxx street',
          city: 'portland',
          state: 'maine',
          zipCode: '041111'
        },
        entity: {
          type: 'apartment',
          price: 3000,
          beds: 3,
          baths: 1,
          area: 900,
          postDate: '11/16/2022',
          yearBuilt: 1999
        },
        source: {
          inNetwork: true
        }
      },
      {
        id: 2,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        location: {
          communityName: 'xxx park',
          street: 'xxx street',
          city: 'portland',
          state: 'maine',
          zipCode: '041111'
        },
        entity: {
          type: 'apartment',
          price: 3000,
          beds: 3,
          baths: 1,
          area: 900,
          postDate: '11/16/2022',
          yearBuilt: 1999
        },
        source: {
          inNetwork: true
        }
      }
    ],
    userPreference: {
      // array of card id
      likes: [3,1],
      dislikes: [2]
    }
  }

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
      // Todo: request cards from server
    } catch (error) {
      // Todo: handle query error
      const { alert: { setAlert } } = this.props;
      setAlert(error.message, 'error');
    }
  }

  render() {
    const { cards, userPreference } = this.state;

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
          <HouseList cards={cards} type={'query'} userPreference={userPreference} />
        </Box>
      </div>
    )
  }
}

export default withRouter(withAlert(Rent));