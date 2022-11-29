import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class SettingsDialog extends Component {

    handleSubmit = () => {
        const {  type } = this.props;
        console.log(type)
    }

    render() {
        const { open, handleClose, title, context, type } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {context}
                    </DialogContentText>
                    {type === 'password' ?
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
                        :
                        <TextField
                            autoFocus
                            margin="dense"
                            label={`New ${type}`}
                            fullWidth
                            variant="standard"
                            autoComplete='on'
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
