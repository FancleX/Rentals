import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from '../components/AddressForm';
import ContactForm from '../components/ContactForm';
import Review from '../components/Review';
import Validation from '../utils/Validation';
import withAlert from '../hooks/withAlert';
import GeoCoder from '../utils/Geocoder';

const googleMap = new GeoCoder();

class Post extends Component {

  state = {
    activeStep: 0,
    addressForm: {
      community: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  };

  steps = ['Address', 'Contact', 'Review your information'];

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm getAddressFormValue={this.getAddressFormValue} />;
      case 1:
        return <ContactForm />;
      case 2:
        return <Review />;
    }
  }

  getAddressFormValue = (event, type) => {
    const { value } = event.target;
    const { innerText } = event.currentTarget;

    switch (type) {
      case 'community':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            community: value
          }
        }));
        break;
      case 'address1':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            address1: value
          }
        }));
        break;
      case 'address2':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            address2: value
          }
        }));
        break;
      case 'city':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            city: value
          }
        }));
        break;
      case 'state':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            state: innerText
          }
        }));
        break;
      case 'zipCode':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            zipCode: value
          }
        }));
        break;
      case 'country':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            country: innerText
          }
        }));
        break;
    }
  }

  setActiveStep = (step) => {
    this.setState({ activeStep: step });
  }

  handleNext = async() => {
    const { activeStep } = this.state;
    const { setAlert } = this.props.alert;

    switch (activeStep) {
      case 0:
        const { addressForm } = this.state;
        // string validation
        for (const formELement in addressForm) {
          const key = formELement, value = addressForm[formELement];
          if (key !== 'community' && key !== 'address2') {
            if (!Validation.generalStringValidation(value)) {
              setAlert(`${key} cannot be empty`, 'error');
              return;
            }
          }
        }
        // location validation
        try {
          const { address1, city, state, country, zipCode } = addressForm;
          const location = `${address1}, ${city}, ${state} ${zipCode}, ${country}`;
          const geo = await googleMap.getCoordinates(location);
          console.log(geo);

        } catch (error) {
          setAlert('the address is not found, please check your input', 'error');
        }
        break;
      case 1:
        break;
      case 2:
        break;
    }

    this.setState({ activeStep: activeStep + 1 });
  }

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  }

  render() {
    const { activeStep } = this.state;

    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: '150px' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {this.steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === this.steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={this.handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === this.steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    )
  }
}

export default withAlert(Post);
