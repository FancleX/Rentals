import React, { Component } from 'react';
import Button from '@mui/material/Button';
import ButtonWrapper from './ButtonWrapper';
import withRouter from '../hooks/withRouter';
import { connect } from 'react-redux';

 class SavedHomeButton extends Component {

  handleClick = () => {
    const { navigate } = this.props.router;
    navigate('/save');
  }

  render() {
    const { saves } = this.props;

    return (
      <ButtonWrapper>
        <Button onClick={this.handleClick} variant='outlined' color='secondary' sx={{height: '100%'}}>{saves ? `${saves} Saved Homes` : (saves > 1 ? `${saves} Saved Home`: '0 Saved Home')}</Button>
      </ButtonWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.user.saves,
});

export default connect(mapStateToProps, null)(withRouter(SavedHomeButton));