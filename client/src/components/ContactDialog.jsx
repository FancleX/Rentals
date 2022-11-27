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
import configuration from '../config';
import Validation from '../utils/Validation.ts';

export default class ContactDialog extends Component {

    state = {
        default: {
            // Todo: get from redux
            name: {
                value: 'xcvaadf',
                status: true
            },
            phone: {
                value: '0123456789',
                status: true
            },
            email: {
                value: 'dafadfd@gmail.com',
                status: true
            }
        },
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

    handleSubmit = () => {
        const { isClose } = this.props;
        const { input: { name, phone, question } } = this.state;

        const data = {
            name,
            phone,
            question
        };

        // Todo: send email notification


        isClose();
    };

    handleClose = () => {
        // reset state to default
        const { isClose } = this.props;

        this.setState({ input: { ...this.state.default } });

        isClose();
    };

    render() {

        const { isOpen } = this.props;
        const ariaLabel = { 'aria-label': 'description' };
        const { name, phone, email } = this.state.default;
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
                                <GrammarlyEditorPlugin clientId={configuration.grammarlyApiId}>
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
                                    defaultValue={name.value}
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
                                    defaultValue={phone.value}
                                    inputProps={ariaLabel}
                                    fullWidth
                                    onChange={this.handlePhoneChange}
                                    error={!input.phone.status}
                                    helperText={this.handleErrorInput('phone')}
                                />
                            </Box>

                            <Box py={2}>
                                <Typography variant='subtitle1' gutterBottom>Email</Typography>
                                <TextField value={email.value} disabled inputProps={ariaLabel} fullWidth />
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
