import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import HouseCard from './HouseCard';

export default class HouseList extends Component {

    state = {
        sortOptions: ['None', 'Most Recent', 'Lowest Total Cost', 'Highest Total Cost'],
        sortSelect: '',
        // preview data
        cards: [
            {
                id: 0,
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
        ]
    };


    handleSortSelect = (event) => {
        const { value } = event.target;
        this.setState({ sortSelect: value });
    };

    render() {
        const { sortOptions, sortSelect, cards } = this.state;

        return (
            <main>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', padding: '10px', height: '50px' }}>
                    <Typography sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '1.5rem', margin: 'auto' }}>{cards.length > 0 ? `${cards.length} rentals properties in xxx` : 'No result found :('}</Typography>
                    
                    {cards.length > 0 && (
                        <FormControl sx={{ minWidth: 150, height: '100%', margin: 'auto' }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={sortSelect}
                                onChange={this.handleSortSelect}
                                autoWidth
                                label='Sort'
                            >
                                {sortOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Box>

                {cards.length > 0 && (
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={5}>
                            {cards.map((card) => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <HouseCard data={card} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                )}
            </main>
        )
    }
}
