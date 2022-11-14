import React, { Component } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import PriceSlider from '../components/PriceSlider';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid black',
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


export default class Rent extends Component {
  render() {
    return (
        <Box sx={{ flexGrow: 1, marginTop: '75px'}}>
            <AppBar position="static" style={{backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid grey'}}>
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs="auto">
                        <Search>
                        <SearchIconWrapper sx={{color: 'black'}}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        </Search>
                    </Grid>

                    <Grid item xs={3}></Grid>

                    <Grid item xs={4}>
                        <PriceSlider></PriceSlider>
                    </Grid>

                </Grid>
            
            </Toolbar>
            </AppBar>
        </Box>
    )
  }
}
