import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsDialog from '../components/SettingsDialog';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default class Settings extends Component {

    state = {
        openName: false,
        openPassword: false
    }

    handleButtonClick = (buttonName) => {
        switch (buttonName) {
            case 'name':
                this.setState({ openName: true });
                break;
            case 'password':
                this.setState({ openPassword: true });
                break;
            case 'photo':
                break;
            case 'deactivate':
                break;
        }
    }

    handleClose = () => {
        this.setState({
            openName: false,
            openPassword: false
        });
    }

    render() {

        const { openName, openPassword } = this.state;

        return (
            <Box sx={{ flexGrow: 1, marginTop: '180px' }}>
                <Grid container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                    Profile
                                </ListSubheader>
                            }
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BadgeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '1.2rem', fontWeight: 'bold', px: 0 }}>
                                    Personal Info
                                </ListSubheader>
                            </ListItem>

                            {/* photo */}
                            <ListItem sx={{ py: '16px' }}>
                                <TextField
                                    placeholder='Personalize your profile pic with a custom photo.'
                                    disabled
                                    label='Photo'
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button
                                    sx={{ ml: '10px', minWidth: '86px' }}
                                    variant="contained"
                                    onClick={() => this.handleButtonClick('photo')}
                                    aria-label="upload picture"
                                    component="label"
                                >
                                    <input hidden accept="image/*" type="file" />
                                    <PhotoCamera />
                                </Button>
                            </ListItem>

                            {/* name */}
                            <ListItem sx={{ pb: '16px' }}>
                                <TextField
                                    fullWidth
                                    placeholder='Your first and last given names.'
                                    disabled
                                    label='Name'
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button sx={{ ml: '10px' }} variant="contained" onClick={() => this.handleButtonClick('name')}>Change</Button>
                                <SettingsDialog
                                    open={openName}
                                    handleClose={this.handleClose}
                                    title='Change name'
                                    context=''
                                    type='name'
                                />
                            </ListItem>

                            {/* password */}
                            <ListItem sx={{ pb: '16px' }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EnhancedEncryptionIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '1.2rem', fontWeight: 'bold', px: 0 }}>
                                    Sign in & Security
                                </ListSubheader>
                            </ListItem>
                            <ListItem sx={{ pb: '16px' }}>
                                <TextField
                                    fullWidth
                                    placeholder='********'
                                    disabled
                                    label='Password'
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button sx={{ ml: '10px' }} variant="contained" onClick={() => this.handleButtonClick('password')}>Change</Button>
                                <SettingsDialog
                                    open={openPassword}
                                    handleClose={this.handleClose}
                                    title='Change Password'
                                    context='To Change the password, you must provide original password.'
                                    type='password'
                                />
                            </ListItem>

                            {/* deactivate */}
                            <ListItem sx={{ pb: '16px' }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ManageAccountsIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '1.2rem', fontWeight: 'bold', px: 0 }}>
                                    Manage account
                                </ListSubheader>
                            </ListItem>
                            <ListItem sx={{ pb: '16px' }}>
                                <TextField
                                    fullWidth
                                    placeholder="This will shut down your account, you won't be able to sign in again until your account is reactivated."
                                    disabled
                                    label='Deactivate my account'
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button sx={{ ml: '10px' }} variant="contained" color="error" onClick={() => this.handleButtonClick('deactivate')}>Deactivate</Button>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </Box>
        )
    }
}
