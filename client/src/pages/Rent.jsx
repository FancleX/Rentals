import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PriceFilter from '../components/PriceFilter';
import SearchBar from '../components/SearchBar';
import Box from '@mui/material/Box';


export default class Rent extends Component {
  render() {
    return (
        <Box sx={{ flexGrow: 1, marginTop: '75px'}}>
            <AppBar position="static" style={{backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid grey', padding: '10px'}}>
            <Toolbar>
                <SearchBar />
                <PriceFilter />
          
            </Toolbar>
            </AppBar>
        </Box>
    )
  }
}
