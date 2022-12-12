import React, { Component } from 'react';
import withRouter from '../hooks/withRouter';
import HouseList from '../components/HouseList';
import Box from '@mui/material/Box';

class Favorites extends Component {

    state = {
        // preview data
        cards: [
            {
                id: 3,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
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
                source: {
                    inNetwork: true
                }
            },
            {
                id: 1,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
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
                source: {
                    inNetwork: true
                }
            },
            {
                id: 2,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
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
                source: {
                    inNetwork: true
                }
            }
        ],
        userPreference: {
            // array of card id
            likes: [3, 1, 2],
            dislikes: []
        }
    }

    componentDidMount() {
        // const { params: { id } } = this.props.router;
        // console.log(id)
        // request cards by user id
        
    }

    render() {
        const { cards, userPreference } = this.state;
        return (
            <Box sx={{ width: '100%', mt: '100px' }}>
                <HouseList cards={cards} type={'save'} userPreference={userPreference} />
            </Box>
        )
    }
}

export default withRouter(Favorites);