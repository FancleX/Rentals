import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
import UtityForm from '../components/UtityForm';

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
      country: '',
      images: [],
      videos: [],
      type: '',
      price: '',
      beds: '',
      baths: '',
      area: '',
      builtYear: ''
    },
    utityForm: {
      pet: {
        status: false,
        isEdit: false
      },
      heating: {
        status: false,
        isEdit: false
      },
      cooling: {
        status: false,
        isEdit: false
      },
      parking: '',
      laundry: {
        status: false,
        isEdit: false
      },
      furnished: {
        status: false,
        isEdit: false
      }
    }
  };

  steps = ['Address', 'Utity details', 'Contact', 'Review your information'];

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm getAddressFormValue={this.getAddressFormValue} />;
      case 1:
        return <UtityForm getUtityFormValue={this.getUtityFormValue} />
      case 2:
        return <ContactForm />;
      case 3:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  getAddressFormValue = (event, type) => {
    const { value } = event.target;
    const { innerText } = event.currentTarget;
    const { files } = event.target;

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
      case 'images':
        const prevImages = this.state.addressForm.images;
        const newImages = [...prevImages, ...files];
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            images: newImages
          }
        }));
        break;
      case 'videos':
        const prevVideos = this.state.addressForm.videos;
        const newVideos = [...prevVideos, ...files];
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            videos: newVideos
          }
        }));
        break;
      case 'type':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            type: innerText
          }
        }));
        break;
      case 'price':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            price: value
          }
        }));
        break;
      case 'beds':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            beds: value
          }
        }));
        break;
      case 'baths':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            baths: value
          }
        }));
        break;
      case 'area':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            area: value
          }
        }));
        break;
      case 'builtYear':
        this.setState((prevState) => ({
          addressForm: {
            ...prevState.addressForm,
            builtYear: value
          }
        }));
        break;
      default:
        throw new Error('Unknown type');
    }
  }

  getUtityFormValue = (event, type) => {
    const { innerText } = event.currentTarget;
    const value = innerText === 'Yes';


    switch (type) {
      case 'pet':
        this.setState((prevState) => ({
          utityForm: {
            ...prevState.utityForm,
            pet: {
              status: value,
              isEdit: true
            }
          }
        }));
        break;
      case 'heating':
        this.setState((prevState) => ({
          utityForm: {
            ...prevState.utityForm,
            heating: {
              status: value,
              isEdit: true
            }
          }
        }));
        break;
      case 'cooling':
        this.setState((prevState) => ({
          utityForm: {
            ...prevState.utityForm,
            cooling: {
              status: value,
              isEdit: true
            }
          }
        }));
        break;
      case 'parking':
        this.setState((prevState) => ({
          utityForm: {
            ...prevState.utityForm,
            parking: innerText
          }
        }));
        break;
      case 'laundry':
        this.setState((prevState) => ({
          utityForm: {
            ...prevState.utityForm,
            laundry: {
              status: value,
              isEdit: true
            }
          }
        }));
        break;
      case 'furnished':
        this.setState((prevState) => ({
          utityForm: {
            ...prevState.utityForm,
            furnished: {
              status: value,
              isEdit: true
            }
          }
        }));
        break;
      default:
        throw new Error('Unknown type');
    }
    /**
     * 
     *       pet: null,
      heating: null,
      cooling: null,
      parking: '',
      laundry: null,
      furnished: null
    }
     * 
     *  */
  }

  setActiveStep = (step) => {
    this.setState({ activeStep: step });
  }

  handleNext = async () => {
    const { activeStep } = this.state;
    const { setAlert } = this.props.alert;

    switch (activeStep) {
      case 0:

        this.setState({ activeStep: activeStep + 1 });

        const { addressForm } = this.state;
        // string validation
        for (const formELement in addressForm) {
          const key = formELement, value = addressForm[formELement];
          if (key === 'address1' || key === 'city' || key === 'state' || key === 'zipCode' || key === 'country' || key === 'type') {
            if (!Validation.generalStringValidation(value)) {
              setAlert(`${key} cannot be empty`, 'error');
              return;
            }
          }
          if (key === 'price' || key === 'beds' || key === 'baths') {
            if (!Validation.numberStringValidation(value)) {
              setAlert(`invalid ${key}, please check it again`, 'error');
              return;
            }
          }
          if (key === 'area') {
            if (value) {
              if (!Validation.numberStringValidation(value)) {
                setAlert(`invalid ${key}, please check it again`, 'error');
                return;
              }
            }
          }
        }

        if (addressForm.images.length === 0) {
          setAlert(`Please upload at least one image of your ${addressForm.type}`, 'error');
          return;
        }

        // location validation
        try {
          const { address1, city, state, country, zipCode } = addressForm;
          const location = `${address1}, ${city}, ${state} ${zipCode}, ${country}`;
          const geo = await googleMap.getCoordinates(location);
          console.log(geo);

          this.setState({ activeStep: activeStep + 1 });
        } catch (error) {
          setAlert('the address is not found, please check your input', 'error');
        }
        break;
      case 1:
        const { utityForm } = this.state;
        for (const utityElement in utityForm) {
          const key = utityElement, value = utityForm[utityElement];
          if (key !== 'parking') {
            const { isEdit } = value;
            if (!isEdit) {
              setAlert(`${key} cannot be empty, please select an option`, 'error');
              return;
            }
          }
          if (!Validation.generalStringValidation(value)) {
            setAlert(`${key} cannot be empty, please select an option`, 'error');
            return;
          }
        }
        this.setState({ activeStep: activeStep + 1 });
        break;
      case 2:
        
        break;
      default:
        throw new Error('Unknown step');
    }


  }

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
  }

  render() {
    const { activeStep } = this.state;

    return (
      <Container component="main" maxWidth="md" sx={{ mb: 4, mt: '150px' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Post Your Property
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
