import React, { Component } from 'react';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Button from '@mui/material/Button';
import ContactDialog from './ContactDialog';

export default class ContactCard extends Component {

    state = {
        open: false
    };

    handleDialogOpen = () => {
        this.setState({open: true});
    };

    handleDialogClose = () => {
        this.setState({open: false});
    };


    render() {
        const { contact } = this.props;
        const { open } = this.state;

        return (
            <Grid container pt='10px' pb='20px' width='100%' spacing={2}>

                <Grid item xs={1}><ContactPhoneOutlinedIcon /></Grid>
                <Grid item xs={11} pl='0px !important' pt='13px !important'>
                    <Typography variant='h6' gutterBottom>Contact Information</Typography>
                    <Card sx={{ maxWidth: 345, mt: '10px' }}>
                        <CardHeader
                            avatar={<Avatar src={contact.avatar} aria-label="avatar" />}
                            title={<Typography fontSize='large'>{contact.name}</Typography>}
                            subheader={
                                contact.verified ? <Typography display='inline-block'>
                                    <VerifiedOutlinedIcon fontSize='small' color='success' sx={{ mb: '-3px', pr: '3px' }} />
                                    <span
                                        style={{
                                            backgroundColor: 'rgba(157, 236, 104, 0.29)',
                                            textDecoration: 'underline',
                                            color: 'rgba(43, 45, 42, 0.61)',
                                            fontSize: '0.9rem'
                                        }}>
                                        Verified
                                    </span>
                                </Typography> : ''
                            }
                        />
                        <CardContent style={{ paddingTop: 0 }}>
                            <Typography>
                                {`Email: ${contact.email}`}
                            </Typography>
                            <Typography>
                                {`Phone: ${contact.phone}`}
                            </Typography>
                            <Typography>
                                {`Office Time: ${contact.officeTime}`}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" fullWidth startIcon={<ForwardToInboxOutlinedIcon />} onClick={this.handleDialogOpen}>
                                Ask a question
                            </Button>
                            <ContactDialog isOpen={open} isClose={this.handleDialogClose} />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}
