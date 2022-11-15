import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonWrapper from './ButtonWrapper';


export default class PriceFilter extends Component {

    state = {
        open: false,
        minimumPrice: ['0', '200', '400', '600', '800', '1000', '1200', '1400', '1600'],
        maximumPrice: ['1800', '2000', '2200', '2400', '2600', '2800', '3000', '3200', 'Any Price'],
        currentPrice: {
            min: '',
            max: ''
        },
        tempPrice: {
            min: '',
            max: ''
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

    handleDialogChange = (event) => {
        const btnName = event.currentTarget.innerText;
        const {tempPrice} = this.state;
        // sync change
        if (btnName === 'OK') {
            this.setState({currentPrice: {...tempPrice}});
        }
        this.setState({open: false});
    }

    handleMinChange = (event) => {
        this.setState((prevState) => ({
            tempPrice: {
                ...prevState.tempPrice,
                min: event.target.value
            }
        }));
    };

    handleMaxChange = (event) => {
        this.setState((prevState) => ({
            tempPrice: {
                ...prevState.tempPrice,
                max: event.target.value
            }
        }));
    };

    priceRangeDisplay = () => {
        const {min, max} = this.state.currentPrice;
        if (!min && !max) {
            return 'Price Range';
        }
        if (isNaN(max) || !max) {
            return `$${min}+`;
        }
        if (!min) {
            return `$0 - $${max}`;
        }
        return `$${min} - $${max}`;
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
                    <DialogTitle sx={{backgroundColor: 'grey.200'}}>Price Range</DialogTitle>
                    <DialogContent dividers>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-dialog-select-label">Minimum</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={this.state.tempPrice.min}
                                    onChange={this.handleMinChange}
                                    input={<OutlinedInput label="Minimum Price" />}
                                >
                                    {this.state.minimumPrice.map((price, index) => {
                                        return (
                                            <MenuItem key={index} value={price}>${price}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <Typography sx={{padding: '25px 20px 25px 20px'}}>
                                -
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-dialog-select-label">Maximum</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={this.state.tempPrice.max}
                                    onChange={this.handleMaxChange}
                                    input={<OutlinedInput label="Maximum Price" />}
                                >
                                    {this.state.maximumPrice.map((price, index) => {
                                        return (
                                            <MenuItem key={index} value={price}>{isNaN(price) ? price : '$' + price}</MenuItem>
                                        );
                                    })}
                                </Select>
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
