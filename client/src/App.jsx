import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from './pages/Signup';
import Rent from './pages/Rent';
import Property from './pages/Property';


export default class App extends Component {


  render() {
    return (
      // register router table
      <Router>
        <NavBar />
        <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyItems: 'center' }}>
          <Routes>
            <Route exact path="/" element={ <Home /> }/> 
            <Route exact path="/signin" element={ <Signin /> } />
            <Route exact path="/signup" element={ <Signup /> } />
            <Route exact path='/rent' element={ <Rent /> } />
            <Route path='/property/search' element={ <Property /> } />
            {/* <Route path="/rentals">{loggedIn ? <Navigate to="/" replace /> : <PublicHomePage />}</Route> */}
            {/* no match route */}
            <Route path="*" element={ <Navigate to="/" replace />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    )
  }
}

