import React, { Component } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import withRouter from '../hooks/withRouter';
import { connect } from 'react-redux';
import Validation from '../utils/Validation.ts';
import { uploadSearchHistory } from '../redux/reducers/userReducer';

const queryString = require('query-string');

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: '1px solid black',
    height: '40px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));


class SearchBar extends Component {

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
    return (
        <Search>
            <SearchIconWrapper sx={{color: 'black'}}>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={this.handleSearch}
            />
        </Search>
    )
  }
}

const mapStateToProps = (state) => ({
  searchHistory: state.user.searchHistory
});

const mapDispatchToProps = (dispatch) => ({
  uploadSearchHistory: (history) => dispatch(uploadSearchHistory(history))
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
