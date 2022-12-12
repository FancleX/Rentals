import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import Validation from '../utils/Validation.ts';
import withAlert from '../hooks/withAlert';
import withRouter from '../hooks/withRouter';
import { signup } from '../redux/reducers/userReducer';

class Signup extends Component {

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const { email, password, phone, firstName, lastName } = {
          email: data.get('email'),
          password: data.get('password'),
          phone: data.get('phone'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName')
        };
        
        const { alert: { setAlert }, router: { navigate }, signup } = this.props;

        if (!Validation.generalStringValidation(firstName) || !Validation.generalStringValidation(lastName)) {
            setAlert('Invalid name', 'error');
            return;
        }

        if (!email || !Validation.emailValidation(email)) {
            setAlert('Invalid email address', 'error');
            return;
        }

        if (!phone || !Validation.numberStringvalidationWithLength(phone, 10)) {
            setAlert('Invalid phone number, phone number should have 10 numbers', 'error');
            return;
        }

        if (!password || (!Validation.generalStringValidation(password) && password.length >= 6)) {
            setAlert('Password lenght must be greater than 6', 'error');
            return;
        }

        const name = `${firstName} ${lastName}`;
        const user = { name, email, phone, password };
        const { payload: { status, msg } } = await signup(user);
        if (status) {
            setAlert(`Wellcome ${msg}`, 'success');
            navigate('/', { replace: true });
        } else {
            setAlert(msg, 'error');
        }
    }

  render() {
    return (
        <Container maxWidth="xs" sx={{border: 1, borderColor: 'grey.500', borderRadius: '16px', boxShadow: 3, marginTop: '200px', minWidth: '500px', maxHeight: '650px'}}>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="/signin" variant="body2" style={{color: 'inherit'}}>
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    signup: (user) => dispatch(signup(user))
});

export default connect(null, mapDispatchToProps)(withAlert(withRouter(Signup)));