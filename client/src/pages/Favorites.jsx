import React, { Component } from 'react';
import HouseList from '../components/HouseList';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { getSavesEntity } from '../redux/reducers/userReducer';
import { Typography } from '@mui/material';

class Favorites extends Component {
    
    async componentDidMount() {
        const { fetchSaves } = this.props;
        await fetchSaves();
    }

    render() {
        const { saves, userSaves } = this.props;

        return (
            <>
                {
                    saves.length > 0 ? (
                        <Box sx={{ width: '100%', mt: '100px' }}>
                            <HouseList cards={userSaves} type={'save'} userPreference={saves} />
                        </Box>
                    ) : (
                        <Typography>You don't have any saved house</Typography>
                    )
                }
            </>
        )
    }
}



const mapStateToProps = (state) => ({
    userSaves: state.user.userSaves,
    saves: state.user.saves
});

const mapDispatchToProps = (dispatch) => ({
    fetchSaves: () => dispatch(getSavesEntity())
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);