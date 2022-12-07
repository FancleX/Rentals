import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import countries from '../assets/countries.json';
import states from '../assets/states.json';

export default class AddressForm extends Component {

    typeOption = ['House', 'Apartment', 'Condo'];

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
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Property Detials
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={this.typeOption}
                            id="disable-close-on-select"
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label="Type" variant="standard" />
                            )}
                            onChange={(event) => getAddressFormValue(event, 'type')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="price"
                            name="price"
                            label="Price per month"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'price')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="beds"
                            name="beds"
                            label="Number of bedroom"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'beds')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="baths"
                            name="baths"
                            label="Number of bathroom"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'baths')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="area"
                            name="area"
                            label="Area (sqft)"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'area')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="yob"
                            name="yob"
                            label="Year of build"
                            fullWidth
                            variant="standard"
                            onChange={(event) => getAddressFormValue(event, 'builtYear')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="outlined" component="label" fullWidth>
                            Upload Images
                            <input hidden accept="image/*" multiple type="file" onChange={(event) => getAddressFormValue(event, 'images')} />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="outlined" component="label" fullWidth>
                            Upload Videos
                            <input hidden accept="video/*" multiple type="file" onChange={(event) => getAddressFormValue(event, 'videos')} />
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
