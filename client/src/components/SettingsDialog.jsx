import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Validation from '../utils/Validation';
import withAlert from '../hooks/withAlert';
import { connect } from 'react-redux';
import { updateUserName, updateUserPassword, updateUserPhone } from '../redux/reducers/userReducer';

class SettingsDialog extends Component {

    state = {
        oldPassword: '',
        newPassword: '',
        other: ''
    };

    handleSubmit = async () => {
        const {
            type,
            alert: { setAlert },
            updateUserName,
            updateUserPhone,
            updateUserPassword
        } = this.props;
        const { other, oldPassword, newPassword } = this.state;

        switch (type) {
            case 'name':
                if (!Validation.generalStringValidation(other)) {
                    setAlert('name cannot be empty', 'error');
                } else {
                    const { payload: { status, msg } } = await updateUserName({ name: other });
                    if (status) {
                        setAlert(msg, 'success');
                    } else {
                        setAlert(msg, 'error');
                    }
                }
                break;
            case 'phone':
                if (!Validation.numberStringvalidationWithLength(other, 10)) {
                    setAlert('Invalid phone number', 'error');
                } else {
                    const { payload: { status, msg } } = await updateUserPhone({ phone: other });
                    if (status) {
                        setAlert(msg, 'success');
                    } else {
                        setAlert(msg, 'error');
                    }
                }
                break;
            case 'password':
                if (!Validation.passwordValidation(newPassword, 6)) {
                    setAlert('Password should at least contain 6 letters or numbers', 'error');
                } else {
                    const { payload: { status, msg } } = await updateUserPassword({ oldPassword, newPassword });
                    if (status) {
                        setAlert(msg, 'success');
                    } else {
                        setAlert(msg, 'error');
                    }
                }
                break;
        }
    }

    handleOldPassword = (event) => {
        const { value } = event.target;
        this.setState({ oldPassword: value });
    }

    handleNewPassword = (event) => {
        const { value } = event.target;
        this.setState({ newPassword: value });
    }

    handleOthers = (event) => {
        const { value } = event.target;
        this.setState({ other: value });
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
                        (
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
                                    onChange={this.handleOldPassword}
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
                                    onChange={this.handleNewPassword}
                                />
                            </form>
                        ) : (
                            <TextField
                                autoFocus
                                margin="dense"
                                label={`New ${type}`}
                                fullWidth
                                variant="standard"
                                autoComplete='on'
                                onChange={this.handleOthers}
                            />
                        )
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

const mapDispatchToProps = (dispatch) => ({
    updateUserName: (data) => dispatch(updateUserName(data)),
    updateUserPhone: (data) => dispatch(updateUserPhone(data)),
    updateUserPassword: (data) => dispatch(updateUserPassword(data))
});

export default connect(null, mapDispatchToProps)(withAlert(SettingsDialog));