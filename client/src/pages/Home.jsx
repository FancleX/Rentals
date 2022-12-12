import React, { Component } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import withRouter from '../hooks/withRouter';
import Validation from '../utils/Validation.ts';
import { connect } from 'react-redux';
import { uploadSearchHistory } from '../redux/reducers/userReducer';

const queryString = require('query-string');

class HomePage extends Component {

  state = {
    open: false,
    search: [],
  };

  logoPart = {
    name: "Rentals",
    slogan: "Find your next accommodation just now!"
  };

  inputLabel = {
    placeholder: "Enter an address, neighborhood, city, or ZIP code"
  };

  setOpen = (isOpen) => {
    this.setState({ open: isOpen });
  }

  handleSearch = async (event) => {
    const { target: { value }, key } = event;
    const { navigate } = this.props.router;
    const { uploadSearchHistory } = this.props;

    if (key === 'Enter') {
      //parse query input      
      const data = Validation.generalStringValidation(value) ? { location: value, boundary: 500 } : { location: 'all' };
      await uploadSearchHistory(data);
      // router push
      navigate(`/rent/search?${queryString.stringify(data)}`);
    }
  }

  render() {
    const { searchHistory } = this.props;

    return (
      <Box sx={{ flexGrow: 1, textAlign: '-webkit-center', marginTop: '18%' }}>
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
                  isOptionEqualToValue={(option, value) => (!Validation.generalStringValidation(value) || option === value)}
                  getOptionLabel={(option) => option}
                  options={searchHistory}
                  onKeyUp={this.handleSearch}
                  clearOnBlur={false}
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
                        startAdornment: (<SearchIcon />)
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

const mapStateToProps = (state) => ({
  searchHistory: state.user.searchHistory
});

const mapDispatchToProps = (dispatch) => ({
  uploadSearchHistory: (history) => dispatch(uploadSearchHistory(history))
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));