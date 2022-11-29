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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class Settings extends Component {

    state = {
        open: false
    }

    handleButtonClick = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {

        const { open } = this.state;

        return (
            <Box sx={{ flexGrow: 1, marginTop: '10%' }}>
                <Grid container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    Settings
                                </ListSubheader>
                            }
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EnhancedEncryptionIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <TextField
                                    fullWidth
                                    placeholder='********'
                                    disabled
                                    label='Password'
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button sx={{ ml: '10px' }} variant="contained" onClick={this.handleButtonClick}>Change</Button>
                                <Dialog open={open} onClose={this.handleClose}>
                                    <DialogTitle>Change Password</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            To Change the password, you must provide original password.
                                        </DialogContentText>
                                        <form>
                                            <TextField
                                                sx={{ pt: '20px', pb: '10px' }}
                                                autoFocus
                                                name='Original Password'
                                                margin="dense"
                                                label="Original Password"
                                                type="password"
                                                fullWidth
                                                variant="standard"
                                                autoComplete='off'
                                            />
                                            <TextField
                                                sx={{ pt: '10px' }}
                                                autoFocus
                                                name='New Password'
                                                margin="dense"
                                                label="New Password"
                                                type="password"
                                                fullWidth
                                                variant="standard"
                                                autoComplete='off'
                                            />
                                        </form>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose}>Cancel</Button>
                                        <Button onClick={this.handleClose}>Submit</Button>
                                    </DialogActions>
                                </Dialog>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </Box>
        )
    }
}
