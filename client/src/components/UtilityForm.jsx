import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default class UtilityForm extends Component {

    items = [
        { type: 'pet', label: 'Pet allowed' },
        { type: 'heating', label: 'Heating availability ' },
        { type: 'cooling', label: 'AC Unit availability ' },
        { type: 'laundry', label: 'Laundary availability ' },
        { type: 'furnished', label: 'Furnished' }
    ];

    parkingOption = ['Off street', 'Garage', 'Not allowed'];

    option = ['Yes', 'No'];



    render() {
        const { getUtilityFormValue } = this.props;

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Utities
                </Typography>
                <Grid container spacing={3}>
                    {this.items.map((item) => (
                        <Grid item xs={12} sm={6} key={item.type} >
                            <Autocomplete
                                options={this.option}
                                id="disable-close-on-select"
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField {...params} label={item.label} variant="standard" />
                                )}
                                onChange={(event) => getUtilityFormValue(event, item.type)}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={this.parkingOption}
                            id="disable-close-on-select"
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label='Parking options' variant="standard" />
                            )}
                            onChange={(event) => getUtilityFormValue(event, 'parking')}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
