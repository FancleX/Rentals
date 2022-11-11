import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default class App extends Component {
  render() {
    return (
      // register router table
      <Router>
        <NavBar />
        <Box sx={{ position: 'relative', minHeight: "90vh" }}>
          <Routes>
            <Route exact path="/" element={ <Home /> }/> 
            {/* <Route path="/rentals">{loggedIn ? <Navigate to="/" replace /> : <PublicHomePage />}</Route> */}
            {/* <Navigate to="/" /> */}
          </Routes>
        </Box>
        <Footer />
      </Router>
    )
  }
}

