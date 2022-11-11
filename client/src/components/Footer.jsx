import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
        <AppBar position="static" className='footer'>
                <Toolbar disableGutters>
                    <Grid container spacing={2}>
                        <Grid item style={{textAlign: "center"}} xs={6} md={4}>
                            <Typography variant="caption" fontSize="inherit">Rentals.com ©2022</Typography>
                        </Grid>
                        <Grid item xs={6} md={5}></Grid>
                        <Grid item xs={6} md={3}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="https://www.facebook.com/"
                                >
                                    <FacebookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                    Facebook
                                </Link>
                                <Link
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="inherit"
                                    href="https://www.instagram.com/"
                                    >
                                    <InstagramIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                    Instagram
                                </Link>
                                <Link
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="inherit"
                                    href="https://www.whatsapp.com/"
                                    >
                                    <WhatsAppIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                    WhatsApp
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                </Toolbar>
        </AppBar>
    )
  }
}
