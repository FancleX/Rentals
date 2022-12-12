import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { signin } from '../redux/reducers/userReducer';


class SignIn extends Component {

  handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = {
      email: data.get('email'),
      password: data.get('password')
    };

    const { alert: { setAlert }, router: { navigate }, signin } = this.props;

    if (!email || !Validation.emailValidation(email)) {
      setAlert('Invalid email address', 'error');
      return;
    }

    if (!password || (!Validation.generalStringValidation(password) && password.length >= 6)) {
      setAlert('Password lenght must be greater than 6', 'error');
      return;
    }

    const user = { email, password };
    const { payload: { status, msg } } = await signin(user);
    if (status) {
        setAlert(`Wellcome ${msg}`, 'success');
        navigate('/', { replace: true });
    } else {
        setAlert(msg, 'error');
    }
  }

  render() {
    return (
      <Container maxWidth="xs" sx={{ border: 1, borderColor: 'grey.500', borderRadius: '16px', boxShadow: 3, marginTop: '200px', minWidth: '300px', maxHeight: '600px' }}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ color: 'inherit' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" style={{ color: 'inherit' }}>
                  Don't have an account? Sign Up
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
    signin: (user) => dispatch(signin(user))
});

export default connect(null, mapDispatchToProps)(withAlert(withRouter(SignIn)));