import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

export default class PolicyForm extends Component {

    state = {
        startDate: dayjs(),
        endDate: dayjs()
    }

    updateDate = (event, type) => {
        if (type === 'startDate') {
            this.setState({ startDate: event });
        } else {
            this.setState({ endDate: event });
        }
    }

    render() {
        const { getPolicyFormValue } = this.props;
        const { startDate, endDate } = this.state;

        return (
            <React.Fragment>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography variant="h6" gutterBottom>
                        Setup Rental Policies
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="deposit"
                                name="deposit"
                                label="Deposit"
                                required
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={(event) => getPolicyFormValue(event, 'deposit')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="security fee"
                                name="security fee"
                                label="Security fee"
                                fullWidth
                                required
                                variant="standard"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={(event) => getPolicyFormValue(event, 'securityFee')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <GrammarlyEditorPlugin clientId={process.env.REACT_APP_GRAMMARLY_API_KEY}>
                                <textarea
                                    placeholder='Add a description to your property'
                                    style={{ width: '100%' }}
                                    rows={10}
                                    onChange={(event) => getPolicyFormValue(event, 'description')}
                                />
                            </GrammarlyEditorPlugin>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DesktopDatePicker
                                label="Rent start date"
                                inputFormat="MM/DD/YYYY"
                                value={startDate}
                                onChange={(event) => {
                                    getPolicyFormValue(event, 'startDate');
                                    this.updateDate(event, 'startDate');
                                }}
                                renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DesktopDatePicker
                                label="Rent end date"
                                inputFormat="MM/DD/YYYY"
                                value={endDate}
                                onChange={(event) => {
                                    getPolicyFormValue(event, 'endDate');
                                    this.updateDate(event, 'endDate');
                                }}
                                renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>

            </React.Fragment>
        )
    }
}
