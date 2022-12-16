import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import Validation from '../utils/Validation.ts';
import withAlert from '../hooks/withAlert';
import { connect } from 'react-redux';
import { sendNotification } from '../redux/reducers/userReducer';

class ContactDialog extends Component {

    state = {
        input: {
            name: {
                value: '',
                status: true
            },
            phone: {
                value: '',
                status: true
            },
            email: {
                value: '',
                status: true
            }
        }
    };

    handleErrorInput = (type) => {
        const { input } = this.state;
        const { value, status } = input[type];
        const prefix = 'Please give a valid ';
        const reply = value === 'name' ? `${prefix} ${value}` : `${prefix} phone number`;
        return status ? '' : reply;
    };

    handleQuestionChange = (event) => {
        const { value } = event.target;

        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                question: {
                    value,
                    status: value
                }
            }
        }));
    };

    handleNameChange = (event) => {
        const { value } = event.target;

        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                name: {
                    value,
                    status: Validation.generalStringValidation(value)
                }
            }
        }));
    };

    handlePhoneChange = (event) => {
        const { value } = event.target;

        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                phone: {
                    value,
                    status: Validation.numberStringValidation(value) && value.length === 10
                }
            }
        }));
    };

    handleSubmit = async () => {
        const { isClose } = this.props;
        const { input: { question } } = this.state;
        const { contacterId, sendNotification, alert: { setAlert } } = this.props;
        const data = {
            receiverId: contacterId,
            content: question
        };

        // Todo: send email notification
        const { payload: { status, msg } } = await sendNotification(data);
        if (status) {
            setAlert(msg, 'success');
        } else {
            setAlert(msg, 'error');
        }
        isClose();
    };

    handleClose = () => {
        const { isClose } = this.props;
        isClose();
    };

    render() {
        const { isOpen } = this.props;
        const ariaLabel = { 'aria-label': 'description' };
        const { name, phone, email } = this.props;
        const { input } = this.state;

        return (
            <Dialog
                open={isOpen}
                onClose={this.handleClose}
                maxWidth='xs'
                fullWidth
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Ask a question
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction='column'
                        spacing={2}
                    >
                        <DialogContent dividers>
                            <Box>
                                <Typography variant='subtitle1' gutterBottom>Enter your question</Typography>
                                <GrammarlyEditorPlugin clientId={process.env.REACT_APP_GRAMMARLY_API_KEY}>
                                    <textarea
                                        placeholder='Add your question'
                                        style={{ width: '98%' }}
                                        rows={10}
                                        onChange={this.handleQuestionChange}
                                    />
                                </GrammarlyEditorPlugin>
                            </Box>

                            <Box py={2}>
                                <Typography variant='subtitle1' gutterBottom>Your First & Last Name</Typography>
                                <TextField
                                    defaultValue={name}
                                    inputProps={ariaLabel}
                                    fullWidth
                                    onChange={this.handleNameChange}
                                    error={!input.name.status}
                                    helperText={this.handleErrorInput('name')}
                                />
                            </Box>

                            <Box py={2}>
                                <Typography variant='subtitle1' gutterBottom>Phone</Typography>
                                <TextField
                                    defaultValue={phone}
                                    inputProps={ariaLabel}
                                    fullWidth
                                    onChange={this.handlePhoneChange}
                                    error={!input.phone.status}
                                    helperText={this.handleErrorInput('phone')}
                                />
                            </Box>

                            <Box py={2}>
                                <Typography variant='subtitle1' gutterBottom>Email</Typography>
                                <TextField value={email} disabled inputProps={ariaLabel} fullWidth />
                            </Box>
                        </DialogContent>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit}>Send question</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email
});

const mapDispatchToProps = (dispatch) => ({
    sendNotification: (data) => dispatch(sendNotification(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(ContactDialog));
