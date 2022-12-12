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
import AlertPopup from "./components/AlertPopup";
import Post from "./pages/Post";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import { connect } from 'react-redux';
import { signinWithToken } from "./redux/reducers/userReducer";

class App extends Component {

  async componentDidMount() {
    const { loggedIn, signinWithToken } = this.props;
    if (!loggedIn && localStorage.token) {
      await signinWithToken(localStorage.token);
    }
  }

  render() {
    const { loggedIn } = this.props;

    return (
      // register router table
      <Router>
        <NavBar />
        <AlertPopup />
        <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyItems: 'center' }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/rent/search" element={<Rent />} />
            <Route exact path="/property/search" element={
              loggedIn ? <Property /> : <Navigate to="/signin" replace />
            }>
            </Route>
            <Route exact path="/save" element={
              loggedIn ? <Favorites /> : <Navigate to="/signin" replace />
            }>
            </Route>
            <Route exact path="/post" element={
              loggedIn ? <Post /> : <Navigate to="/signin" replace />
            }>
            </Route>
            <Route exact path="/settings" element={
              loggedIn ? <Settings /> : <Navigate to="/signin" replace />
            }>
            </Route>
            {/* no match route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.isAuth
});

const mapDispatchToProps = (dispatch) => ({
  signinWithToken: (token) => dispatch(signinWithToken(token))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);