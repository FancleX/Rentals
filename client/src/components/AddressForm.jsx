import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from '../assets/countries.json';
import states from '../assets/states.json';

export default class AddressForm extends Component {

    render() {
        const { getAddressFormValue } = this.props;

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Property Address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="community name"
                            name="community name"
                            label="Community name"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'community')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'address1')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'address2')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'city')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <TextField
                            required
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'state')}
                        /> */}
                        <Autocomplete
                            options={states}
                            id="disable-close-on-select"
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField {...params} label="State/Province/Region" variant="standard" />
                            )}
                            onChange={(event) => getAddressFormValue(event, 'state')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            variant="standard"
                            autoComplete="home city"
                            onChange={(event) => getAddressFormValue(event, 'zipCode')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={countries}
                            id="disable-close-on-select"
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                                <TextField {...params} label="Country" variant="standard" />
                            )}
                            onChange={(event) => getAddressFormValue(event, 'country')}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
