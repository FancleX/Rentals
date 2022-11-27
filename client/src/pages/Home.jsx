import React, { Component } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import withRouter from '../components/withRouter';

const queryString = require('query-string');

class HomePage extends Component {

  state = {
    open: false,
    options: [],
    recentSearchHistory: [
      { title: 'The Shawshank Redemption', year: 1994 },
      { title: 'The Godfather', year: 1972 },
      { title: 'The Godfather: Part II', year: 1974 },
    ]
  };

  topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  loading = this.state.open && this.state.options.length === 0;

  logoPart = {
    name: "Rentals",
    slogan: "Find your next accommodation just now!"
  };

  inputLabel = {
    placeholder: "Enter an address, neighborhood, city, or ZIP code"
  };

  sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  setOpen = (isOpen) => {
    this.setState({ open: isOpen });
    this.setState({ options: [...this.topFilms] });
  };

  async componentDidMount() {
    let active = true;

    if (!this.loading) {
      return undefined;
    }

    await this.sleep(1e3); // For demo purposes.

    if (active) {
      this.setState({ options: [...this.topFilms] });
    }

    // Todo: query newly search history
    this.setState({})
  };

  handleSearch = (event) => {
    const { target: { value }, key } = event;
    const { navigate } = this.props.router;

    if (key === 'Enter') {
      console.log(value)
      // Todo: parse query input
      const location = {
        latitude: 0,
        longitude: 0,
        range: 0
      };

      
      // router push
      navigate(`/rent/search?${queryString.stringify(location)}`);
    }
    

  };

  render() {
    return (
      <Box sx={{ flexGrow: 1, textAlign: '-webkit-center', marginTop: '300px' }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6} className='centralBox'>
            <Stack spacing={4} className='logo'>
              <Typography variant="h3" gutterBottom>
                {this.logoPart.name}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {this.logoPart.slogan}
              </Typography>
              <Typography variant="h5" gutterBottom>
                <Autocomplete
                  autoComplete
                  autoHighlight
                  id="searchBar"
                  sx={{ maxWidth: '600px', minWidth: '100px' }}
                  open={this.state.open}
                  onOpen={() => this.setOpen(true)}
                  onClose={() => this.setOpen(false)}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={this.state.options}
                  loading={this.state.loading}
                  onKeyUp={this.handleSearch}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={this.inputLabel.placeholder}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",

                          legend: {
                            marginLeft: "30px"
                          }
                        },
                        "& .MuiAutocomplete-inputRoot": {
                          paddingLeft: "20px !important",
                          borderRadius: "50px"
                        },
                        "& .MuiInputLabel-outlined": {
                          paddingLeft: "20px"
                        },
                        "& .MuiInputLabel-shrink": {
                          marginLeft: "20px",
                          paddingLeft: "10px",
                          paddingRight: 0,
                          background: "white"
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (<SearchIcon />),
                        endAdornment: (
                          <React.Fragment>
                            {this.loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Box>
    )
  }
}

export default withRouter(HomePage);