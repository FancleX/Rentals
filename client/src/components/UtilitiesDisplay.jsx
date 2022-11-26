import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import HeatPumpOutlinedIcon from '@mui/icons-material/HeatPumpOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const theme = createTheme({
  palette: {
    success: {
      main: '#20913c',
    },
  },
});

export default class UtilitiesDisplay extends Component {

  static propType = {
    utilities: {
      pet: PropTypes.bool,
      heating: PropTypes.bool,
      cooling: PropTypes.bool,
      parking: PropTypes.string,
      laundry: PropTypes.bool,
      furinshied: PropTypes.bool
    },
    source: {
      inNetwork: PropTypes.bool.isRequired
    },
    entity: {
      area: PropTypes.number.isRequired
    }
  }

  static defaultProps = {
    utilities: {
      pet: false,
      heating: false,
      cooling: false,
      parking: '',
      laundry: false,
      furinshied: false
    }
  }

  state = {
    utilities: [],
    source: [],
    entity: []
  };

  icons = {
    pet: <PetsOutlinedIcon color={this.props.utilities.pet ? 'success' : 'disabled'} />,
    heating: <HeatPumpOutlinedIcon color={this.props.utilities.heating ? 'success' : 'disabled'} />,
    cooling: <AcUnitOutlinedIcon color={this.props.utilities.cooling ? 'success' : 'disabled'} />,
    parking: <LocalParkingOutlinedIcon color={this.props.utilities.parking ? 'success' : 'disabled'} />,
    laundry: <LocalLaundryServiceOutlinedIcon color={this.props.utilities.laundry ? 'success' : 'disabled'} />,
    furinshied: <WeekendOutlinedIcon color={this.props.utilities.furinshied ? 'success' : 'disabled'} />,
    inNetwork: <PodcastsOutlinedIcon color={this.props.source.inNetwork ? 'success' : 'disabled'} />,
    area: <StraightenOutlinedIcon color={this.props.area ? 'success' : 'disabled'} />
  };

  componentDidMount() {
    this.preprocess();
  };

  preprocess = () => {
    const { utilities, source, area } = this.props;

    const utilityArr = [], sourceArr = [], areaArr = [];

    Object.entries(utilities).forEach((element) => {
      const key = element[0], value = element[1];
      if (key === 'pet') {
        utilityArr.push(
          <Grid item xs={3} key={key}>
            <Stack>
              {this.icons[key]}
              <Typography fontSize='small'>
                {value ? 'pets friendly'  : 'pets not accepted'}
              </Typography>
            </Stack>
          </Grid>
        );
      } else if (key === 'parking') {
        utilityArr.push(
          <Grid item xs={3} key={key}>
            <Stack>
              {this.icons[key]}
              <Typography fontSize='small'>
                {value || 'contact onwer'}
              </Typography>
            </Stack>
          </Grid>
        );
      } else if (key === 'furinshied') {
        utilityArr.push(
          <Grid item xs={3} key={key}>
            <Stack>
              {this.icons[key]}
              <Typography fontSize='small'>
                {value ? 'with furnished' : 'without furnished'}
              </Typography>
            </Stack>
          </Grid>
        );
      } else {
        utilityArr.push(
          <Grid item xs={3} key={key}>
            <Stack>
              {this.icons[key]}
              <Typography fontSize='small'>
                {value ? `${key} available` : `${key} unavailable`}
              </Typography>
            </Stack>
          </Grid>
        );
      }
    });


    let inNetwork = source.inNetwork ? 'In-Network Post' : 'Out of Network Source';
    sourceArr.push(
      <Grid item xs={3} key={'in network'}>
        <Stack>
          {this.icons['inNetwork']}
          <Typography fontSize='small'>
            {inNetwork.toLowerCase()}
          </Typography>
        </Stack>
      </Grid>
    );

    areaArr.push(
      <Grid item xs={3} key={'area'}>
        <Stack>
          {this.icons['area']}
          <Typography fontSize='small'>
            {`${area} sqft`}
          </Typography>
        </Stack>
      </Grid>

    );

    this.setState({ utilities: [...utilityArr], source: [...sourceArr], area: [...areaArr]});

  };

  render() {

    const { utilities, source, area } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} pt='10px'>
          {area}
          {source}
          {utilities}
        </Grid>
      </ThemeProvider>
    )
  }
}

