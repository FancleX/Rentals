import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default class Copyright extends Component {
    render() {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...this.props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
              Rentals.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        )
    }
  }