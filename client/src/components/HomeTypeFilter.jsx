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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { connect } from 'react-redux';
import { sortByHouseType } from '../redux/reducers/propertyReducer';

class HomeTypeFilter extends Component {

    state = {
        open: false,
        homeTypeOptions: ['Houses', 'Apartments/Condos/Co-ops', 'Townhomes'],
        tempHomeTypeSelectStatus: [true, true, true],
        currentHomeTypeSelectStatus: [true, true, true]
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleParentSelectChange = (event) => {
        const { checked } = event.target;
        this.setState({ tempHomeTypeSelectStatus: [checked, checked, checked] });
    };

    handleChange1 = (event) => {
        const { checked } = event.target;
        const { tempHomeTypeSelectStatus } = this.state;
        this.setState({ tempHomeTypeSelectStatus: [checked, tempHomeTypeSelectStatus[1], tempHomeTypeSelectStatus[2]] });
    };

    handleChange2 = (event) => {
        const { checked } = event.target;
        const { tempHomeTypeSelectStatus } = this.state;
        this.setState({ tempHomeTypeSelectStatus: [tempHomeTypeSelectStatus[0], checked, tempHomeTypeSelectStatus[2]] });
    };

    handleChange3 = (event) => {
        const { checked } = event.target;
        const { tempHomeTypeSelectStatus } = this.state;
        this.setState({ tempHomeTypeSelectStatus: [tempHomeTypeSelectStatus[0], tempHomeTypeSelectStatus[1], checked] });
    };

    handleDialogChange = async (event) => {
        const btnName = event.currentTarget.innerText;
        const { tempHomeTypeSelectStatus } = this.state;
        // sync change
        if (btnName === 'OK') {
            this.setState({ currentHomeTypeSelectStatus: [...tempHomeTypeSelectStatus] });

            const { sortByType } = this.props;
            const type = {
                House: tempHomeTypeSelectStatus[0],
                Apartment: tempHomeTypeSelectStatus[1],
                Townhouse: tempHomeTypeSelectStatus[2]
            };

            await sortByType(type);
        }
        this.setState({ open: false });
    };

    priceRangeDisplay = () => {
        const { currentHomeTypeSelectStatus } = this.state;
        const count = currentHomeTypeSelectStatus.filter((e) => e === true).map(() => 1).reduce((a, b) => a + b, 0);
        return count === 0 || count === currentHomeTypeSelectStatus.length ? 'Home Type' : `Home Type (${count})`;
    };


    render() {
        const { open, homeTypeOptions, tempHomeTypeSelectStatus } = this.state;

        const children = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                <FormControlLabel
                    label={homeTypeOptions[0]}
                    control={<Checkbox checked={tempHomeTypeSelectStatus[0]} onChange={this.handleChange1} />}
                />
                <FormControlLabel
                    label={homeTypeOptions[1]}
                    control={<Checkbox checked={tempHomeTypeSelectStatus[1]} onChange={this.handleChange2} />}
                />
                <FormControlLabel
                    label={homeTypeOptions[2]}
                    control={<Checkbox checked={tempHomeTypeSelectStatus[2]} onChange={this.handleChange3} />}
                />
            </Box>
        );

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
                <Dialog disableEscapeKeyDown open={open} onClose={this.handleClose}>
                    <DialogTitle sx={{ backgroundColor: 'grey.200' }}>Home Type</DialogTitle>
                    <DialogContent dividers>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <FormControlLabel
                                    label={(tempHomeTypeSelectStatus[0] && tempHomeTypeSelectStatus[1] && tempHomeTypeSelectStatus[2]) ? 'Deselect All' : 'Select All'}
                                    control={
                                        <Checkbox
                                            checked={tempHomeTypeSelectStatus[0] && tempHomeTypeSelectStatus[1] && tempHomeTypeSelectStatus[2]}
                                            indeterminate={!(tempHomeTypeSelectStatus[0] && tempHomeTypeSelectStatus[1] && tempHomeTypeSelectStatus[2]) &&
                                                (tempHomeTypeSelectStatus[0] || tempHomeTypeSelectStatus[1] || tempHomeTypeSelectStatus[2])}
                                            onChange={this.handleParentSelectChange}
                                        />
                                    }
                                />
                                {children}
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

const mapDispatchToProps = (dispatch) => ({
    sortByType: (type) => dispatch(sortByHouseType(type))
});

export default connect(null, mapDispatchToProps)(HomeTypeFilter);