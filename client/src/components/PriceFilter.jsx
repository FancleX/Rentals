import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

const ButtonWrap = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid grey.500',
    height: '40px',
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        width: 'auto',
    },
}));

export default class PriceFilter extends Component {

    state = {
        open: false,
        minimumPrice: ['0', '200', '400', '600', '800', '1000', '1200'],
        maximumPrice: ['800', '1000', '1200', '1400', '1600', '1800', '2000', '2200', 'Any Price'],
        minPrice: '',
        maxPrice: ''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };


    handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            this.setState({ open: false });
        }
    };

    handleMinChange = (event) => {
        this.setState({ minPrice: event.target.value });
    };

    handleMaxChange = (event) => {
        this.setState({ maxPrice: event.target.value });
    };

    render() {
        return (
            <ButtonWrap>
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
                    {'Price Range'}
                </Button>
                <Dialog disableEscapeKeyDown open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Price Range</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-dialog-select-label">Minimum</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={this.state.minPrice}
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
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-dialog-select-label">Maximum</InputLabel>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={this.state.maxPrice}
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
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </ButtonWrap>

        )
    }
}
