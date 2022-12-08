import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default class Review extends Component {

    state = {
        displayArr: []
    };

    componentDidMount() {
        const { addressForm, utityForm, policyForm } = this.props;
        const renderArr = [];

        for (const address in addressForm) {
            const key = address, value = addressForm[key];
            const label = this.capitalizeFirstString(key);
            if (key === 'images' || key === 'videos') {
                renderArr.push(
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={label} />
                            <Typography variant="body2">{value.length}</Typography>
                        </ListItem>
                    </Grid>
                );
            } else {
                renderArr.push(
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={label} />
                            <Typography variant="body2">{value || 'Not Applicable'}</Typography>
                        </ListItem>
                    </Grid>
                );
            }
        }

        for (const utity in utityForm) {
            const key = utity, value = utityForm[key];
            const label = this.capitalizeFirstString(key);
            if (key !== 'parking') {
                renderArr.push(
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={label} />
                            <Typography variant="body2">{value.status ? 'Yes' : 'No'}</Typography>
                        </ListItem>
                    </Grid>
                );
            } else {
                renderArr.push(
                    <Grid item xs={12} sm={6} key={key}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={label} />
                            <Typography variant="body2">{value || 'Not Applicable'}</Typography>
                        </ListItem>
                    </Grid>
                );
            }
        }

        for (const policy in policyForm) {
            const key = policy, value = policyForm[key];
            const label = this.capitalizeFirstString(key);
            renderArr.push(
                <Grid item xs={12} sm={6} key={key}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={label} />
                        <Typography variant="body2">{value || 'Not Applicable'}</Typography>
                    </ListItem>
                </Grid>
            );
        }

        this.setState({ displayArr: [...renderArr] });
    }

    capitalizeFirstString = (string) => {
        const split = string.split(/(?=[A-Z])/);
        split[0] = split[0].charAt(0).toUpperCase() + split[0].slice(1);
        for (let i = 1; i < split.length; i++) {
            split[i] = split[i].charAt(0).toLowerCase() + split[i].slice(1);
        }
        const str = split.join(' ');
        return str; 
    }

    render() {
        const { description } = this.props;
        const { displayArr } = this.state;

        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Property summary
                </Typography>
                {displayArr.length !== 0 && (
                    <>
                    <List disablePadding>
                    <Grid container spacing={2}>
                        {displayArr}
                    </Grid>
                </List>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Property description
                        </Typography>
                        <Typography gutterBottom>{description.rentDescription || 'No description'}</Typography>
                    </Grid>
                </Grid>
                    </>
                )}
            </React.Fragment>
        )
    }
}
