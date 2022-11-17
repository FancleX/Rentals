import React, { Component } from 'react';
import Button from '@mui/material/Button';
import ButtonWrapper from './ButtonWrapper';

export default class SavedHomeButton extends Component {

    state = {
        saved: 1
    };

  render() {
    const { saved } = this.state;

    return (
      <ButtonWrapper>
        <Button variant='outlined' color='secondary' sx={{height: '100%'}}>{saved > 1 ? `${saved} Saved Homes` : `${saved} Saved Home`}</Button>
      </ButtonWrapper>
    )
  }
}
