import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import ButtonWrapper from './ButtonWrapper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default class BedBathFilter extends Component {

    state = {
        open: false,
        bedroomOptions: ['Any', '1', '2', '3', '4', '5'],
        bathroomOptions: ['Any', '1', '1.5', '2', '3', '4'],
        tempRoomsValue: {
            numberOfBedrooms: '',
            numberOfBathrooms: ''
        },
        currentRoomsValue: {
            numberOfBedrooms: '',
            numberOfBathrooms: ''
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (_, reason) => {
        if (reason === 'backdropClick') {
            return;
        }
    };

    handleBedroomToggleButton = (_, newValue) => {
        this.setState((prevState) => ({
            tempRoomsValue: {
                ...prevState.tempRoomsValue,
                numberOfBedrooms: newValue
            }
        }));
    };

    handleBathroomToggleButton = (_, newValue) => {
        this.setState((prevState) => ({
            tempRoomsValue: {
                ...prevState.tempRoomsValue,
                numberOfBathrooms: newValue
            }
        }));
    };

    handleDialogChange = (event) => {
        const btnName = event.currentTarget.innerText;
        const { tempRoomsValue } = this.state;
        // sync change
        if (btnName === 'OK') {
            this.setState({ currentRoomsValue: { ...tempRoomsValue } });
        }
        this.setState({ open: false });
    }

    priceRangeDisplay = () => {
        const { numberOfBedrooms, numberOfBathrooms } = this.state.currentRoomsValue;

        if ((numberOfBedrooms && numberOfBathrooms) && (!isNaN(numberOfBedrooms) && !isNaN(numberOfBathrooms))) {
            return `${numberOfBedrooms}+ bd, ${numberOfBathrooms}+ ba`;
        }
        if (numberOfBedrooms && !isNaN(numberOfBedrooms)) {
            return `${numberOfBedrooms}+ bd, 0+ ba`;
        }
        if (numberOfBathrooms && !isNaN(numberOfBathrooms)) {
            return `0+ bd, ${numberOfBathrooms}+ ba`;
        }
        return 'Beds & Baths';;
    };

    render() {
        return (
            <ButtonWrapper>
                <Button variant='outlined'
                    sx={{
                        height: '100%',
                        color: 'black',
                        '&:hover': {
                            borderColor: 'black'
                        },
                        borderColor: 'inherit',
                    }}
                    onClick={this.handleClickOpen}
                >
                    {this.priceRangeDisplay()}
                </Button>
                <Dialog disableEscapeKeyDown open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle sx={{ backgroundColor: 'grey.200' }}>Number of Bedrooms</DialogTitle>
                    <DialogContent dividers>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={this.state.tempRoomsValue.numberOfBedrooms}
                                    exclusive
                                    onChange={this.handleBedroomToggleButton}
                                    aria-label="Platform"
                                >
                                    {this.state.bedroomOptions.map((number, index) => {
                                        return (
                                            <ToggleButton key={index} value={number}>{isNaN(number) ? number : `${number}+`}</ToggleButton>
                                        );
                                    })}
                                </ToggleButtonGroup>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogTitle sx={{ backgroundColor: 'grey.200' }}>Number of Bathrooms</DialogTitle>
                    <DialogContent dividers>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={this.state.tempRoomsValue.numberOfBathrooms}
                                    exclusive
                                    onChange={this.handleBathroomToggleButton}
                                    aria-label="Platform"
                                >
                                    {this.state.bathroomOptions.map((number, index) => {
                                        return (
                                            <ToggleButton key={index} value={number}>{isNaN(number) ? number : `${number}+`}</ToggleButton>
                                        );
                                    })}
                                </ToggleButtonGroup>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogChange}>Cancel</Button>
                        <Button onClick={this.handleDialogChange}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </ButtonWrapper>

        )
    }
}
