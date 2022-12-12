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
        // filteredCards: []
    }


    handleSortSelect = (event) => {
        const { value } = event.target;
        this.setState({ sortSelect: value });
    }

    // componentDidMount() {
    //     const { cards, userPreference } = this.props;
    //     const filteredResult = [];
    //     console.log(this.props)
    //     for (let card of cards) {
    //         const { _id } = card;
    //         const newCard = {...card};
    //         if (userPreference.find((save) => save === _id)) {
    //             newCard.isLike = true;
    //         } else {
    //             newCard.isLike = false;
    //         }
    //         filteredResult.push(newCard);
    //     }
    //     console.log(filteredResult)
    //     this.setState({filteredCards: [...filteredResult]});
    // }

    render() {
        const { sortOptions, sortSelect } = this.state;
        const { cards, type } = this.props;

        return (
            <main>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', padding: '10px', height: '50px' }}>
                    <Typography sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '1.5rem', margin: 'auto' }}>
                        {type === 'query' ? (cards.length > 0 ? `${cards.length} rentals properties in xxx` : 'No result found :(') : (cards.length > 0 ? `${cards.length} saved rentals properties` : '')}
                    </Typography>
                    
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
                                <Grid item key={card._id} xs={12} sm={6} md={4}>
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
