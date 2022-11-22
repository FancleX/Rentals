import React, { Component } from 'react';
import withRouter from '../components/withRouter';
import Carousel from 'react-material-ui-carousel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

const queryString = require('query-string');


class Property extends Component {

    state = {
        carouselImages: [],
        // all information
        cards: [
            {
                id: 0,
                img: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"],
                vedio: '',
                location: {
                    communityName: 'xxx park',
                    street: 'xxx street',
                    city: 'portland',
                    state: 'maine',
                    zipCode: '041111'
                },
                entity: {
                    type: 'apartment',
                    price: 3000,
                    beds: 3,
                    baths: 1,
                    area: 900,
                    postDate: '11/16/2022',
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
                requirements: {
                    deposite: '3000',
                    securityFee: '1000',
                    leaseDuration: 12
                },
                contact: {
                    name: 'xxx',
                    phone: 'xxx',
                    email: 'xxx'
                },
                source: {
                    inNetwork: true
                }
            }
        ]
    }


    images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
    ];

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
                                    <img src={element} style={{ height: '300px' }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                );
            }
        }

        this.setState({ carouselImages: [...items] });
    };

    componentDidMount() {
        const { search } = this.props.router.location;
        const params = queryString.parse(search);
        // console.log(params.id)
        this.carouselProcessor(this.images);
    }

    render() {

        const { carouselImages } = this.state;

        return (
            <Box sx={{ width: '100vw' }}>
                <Carousel
                    sx={{ width: '100%', marginTop: '80px', height: '300px' }}
                    autoPlay={false}
                    navButtonsAlwaysVisible
                    animation='fade'
                    duration={500}
                    indicators={false}
                    fullHeightHover={true}
                >
                    {carouselImages}
                </Carousel>
            </Box>
        )
    }
}

export default withRouter(Property);