import React, { Component } from 'react';
import withRouter from '../hooks/withRouter';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import MissedVideoCallOutlinedIcon from '@mui/icons-material/MissedVideoCallOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ReactPlayer from 'react-player';
import Toolbar from '@mui/material/Toolbar';
import UtilitiesDisplay from '../components/UtilitiesDisplay';
import DescriptionDisplay from '../components/DescriptionDisplay';
import ContactCard from '../components/ContactCard';

const queryString = require('query-string');


class Property extends Component {

    state = {
        displayStatus: {
            photo: true,
            video: false,
            map: false
        },
        carouselImages: [],
        // all information
        cards: {
            id: 0,
            img: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"],
            video: 'https://www.youtube.com/watch?v=Ng-AvudE7C8',
            location: {
                // Todo: validate convert to latitude and longitude in post mode
                communityName: 'xxx park',
                street: '15 Sawyer St',
                city: 'Portland',
                state: 'Maine',
                zipCode: '04103'
            },
            entity: {
                type: 'apartment',
                price: 3000,
                beds: 3,
                baths: 1,
                area: 900,
                yearBuilt: 1999
            },
            utilities: {
                pet: true,
                heating: true,
                cooling: true,
                parking: '',
                laundry: true,
                furinshied: true
            },
            policies: {
                deposit: 3000,
                securityFee: 1000,
                leaseTerm: 12,
                startDate: '',
                endDate: ''
            },
            contact: {
                // user information
                id: 0,
                avatar:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
                name: 'xxx',
                phone: 'xxx',
                email: 'xxx',
                officeTime: 'Mon - Fri, 9am to 5pm',
                verified: true
            },
            source: {
                inNetwork: true
            },
            description: {
                rentDescription: ''
            },
            meta: {
                postDate: '11/16/2022'
            }
        }

    }


    images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
    ]

    carouselProcessor = (data) => {
        const sliderItems = data.length > 3 ? 3 : data.length;
        const items = [];

        for (let i = 0; i < data.length; i += sliderItems) {
            if (i % sliderItems === 0) {
                items.push(
                    <Paper key={i.toString()}>
                        <Grid container spacing={10} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            {data.slice(i, i + sliderItems).map((element, index) => (
                                <Grid item key={index.toString()}>
                                    <img src={element} alt='house img' style={{ width: '100%', height: '400px' }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                );
            }
        }

        this.setState({ carouselImages: [...items] });
    }

    componentDidMount() {
        const { search } = this.props.router.location;
        const params = queryString.parse(search);
        // console.log(params.id)
        // Todo: request house by id then request contact by user id
        this.carouselProcessor(this.images);
    }

    renderPhoto = () => {
        const { carouselImages } = this.state;

        return (
            <Carousel
                sx={{ width: '99%', height: '100%' }}
                autoPlay={false}
                navButtonsAlwaysVisible
                animation='fade'
                duration={500}
                indicators={false}
                fullHeightHover={true}
            >
                {carouselImages}
            </Carousel>
        );
    }

    renderVedio = () => {
        const { cards: { video } } = this.state;
        return (
            <ReactPlayer height='100%' style={{ margin: 'auto' }} url={video} />
        );
    }

    renderMap = () => {
        const { location: { street, city, state, zipCode } } = this.state.cards;
        const mapConfig = {
            mode: 'place',
            location: street.replace(' ', '+') + ',' + city.replace(' ', '+') + ',' + state.replace(' ', '+') + ',' + zipCode
        };

        return (
            <iframe
                title='map'
                width="100%"
                height="100%"
                frameBorder="0"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/${mapConfig.mode}?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&q=${mapConfig.location}`}
                allowFullScreen
            >
            </iframe>
        );
    }

    handleToggle = (type) => {
        if (type === 'Photo') {
            this.setState({
                displayStatus: {
                    photo: true,
                    video: false,
                    map: false
                }
            });
        } else if (type === 'Video') {
            this.setState({
                displayStatus: {
                    photo: false,
                    video: true,
                    map: false
                }
            });
        } else if (type === 'Map') {
            this.setState({
                displayStatus: {
                    photo: false,
                    video: false,
                    map: true
                }
            });
        } else if (type === 'Like') {

        } else {

        }
    }


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    introductionRender = () => {
        const { entity: { type, beds, baths, area } } = this.state.cards;
        const houseType = this.capitalizeFirstLetter(type);
        const bed = beds > 1 ? `${beds} bedrooms` : `${beds} bedroom`;
        const bath = baths > 1 ? `${baths} bathrooms` : `${baths} bathroom`;

        return `${houseType} for rent with ${bed} ${bath}, ${area} sqft`;
    }

    addressRender = () => {
        const { location: { street, city, state, zipCode } } = this.state.cards;

        return `${street}, ${city}, ${state} ${zipCode}`;
    }

    render() {

        const { displayStatus, cards } = this.state;

        return (
            <div>
                <Box sx={{ width: '100vw', marginTop: '80px', height: '400px' }}>
                    {(displayStatus.photo && this.renderPhoto()) || (displayStatus.video && this.renderVedio()) || (displayStatus.map && this.renderMap())}
                </Box>

                <Divider variant="middle" sx={{ pt: '10px' }} />

                <Grid container spacing={3} sx={{ mt: '10px' }}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Stack direction="row" spacing={1} sx={{ pt: '10px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={6}>
                                        <Chip label='Photos' sx={{ m: '5px' }} variant="outlined" avatar={<PhotoSizeSelectActualOutlinedIcon />} onClick={() => this.handleToggle('Photo')} />
                                        <Chip label='Video' sx={{ m: '5px' }} variant="outlined" avatar={<MissedVideoCallOutlinedIcon />} onClick={() => this.handleToggle('Video')} />
                                        <Chip label='Map' sx={{ m: '5px' }} variant="outlined" avatar={<MapOutlinedIcon />} onClick={() => this.handleToggle('Map')} />
                                    </Grid>
                                    <Grid item xs={0} md={2}></Grid>
                                    <Grid item xs={6} md={4}>
                                        <Chip label='Like' sx={{ m: '5px' }} variant="outlined" avatar={<FavoriteBorderOutlinedIcon />} onClick={() => this.handleToggle('Like')} />
                                        <Chip label='Delete' sx={{ m: '5px' }} variant="outlined" avatar={<DeleteForeverOutlinedIcon />} onClick={() => this.handleToggle('Delete')} />
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Divider variant="middle" sx={{ pt: '10px' }} />

                            <Box padding='5px 20px 5px 20px'>
                                <Typography variant='h5' sx={{ pt: '10px' }} gutterBottom>
                                    {this.introductionRender()}
                                </Typography>
                                <Typography variant='body1'>
                                    {this.addressRender()}
                                </Typography>
                                <Typography variant='body2'>
                                    <AccessTimeOutlinedIcon fontSize='x-small' />
                                    {` Published at ${cards.meta.postDate}`}
                                </Typography>
                            </Box>


                            <Divider variant="middle" sx={{ pt: '10px' }} />

                            <Toolbar>
                                <UtilitiesDisplay utilities={cards.utilities} source={cards.source} area={cards.entity.area} />
                            </Toolbar>

                            <Divider variant="middle" sx={{ pt: '10px' }} />

                            <DescriptionDisplay description={cards.description.rentDescription} policies={cards.policies} />

                            <Divider variant="middle" sx={{ pt: '10px' }} />

                            <ContactCard contact={cards.contact} />
                        </Box>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>

            </div>
        )
    }
}

export default withRouter(Property);