import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default class SignInButton extends Component {
  render() {
    return (
      <div>
        <Button size="large" 
        sx={{ my: 2, color: 'black', display: 'block', ":hover":'black'}}>
            <Link style={{textDecoration: 'none', color: 'black'}} to='/signin'>
                SignIn
            </Link>
        </Button>
      </div>
    )
  }
}
