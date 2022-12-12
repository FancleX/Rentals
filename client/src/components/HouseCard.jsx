import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import withRouter from '../hooks/withRouter';
import { connect } from 'react-redux';
import { searchDetail } from '../redux/reducers/propertyReducer';
import withAlert from '../hooks/withAlert';
import { addSaves, deleteSaves, getSaves } from '../redux/reducers/userReducer';

class HouseCard extends Component {

    static propTypes = {
        data: PropTypes.object
    };

    handleClick = async (event) => {
        const { navigate } = this.props.router;
        const { _id } = this.props.data;
        const { searchDetail } = this.props;
        await searchDetail({id: _id});
        navigate(`/property/search?id=${_id}`);
    };

    addtoSaveList = async(id) => {
        const { addSaves, getSaves, alert: { setAlert } } = this.props;
        const { payload: { status, msg } } = await addSaves({propertyId: id});
        console.log(this.props)
        console.log(status, msg)
        if (status) {
            setAlert(msg, 'success');
        } else {
            setAlert(msg, 'error');
        }
        await getSaves();
    }

    deleteFromSaveList = async (id) => {
        const { deleteSaves, getSaves, alert: { setAlert } } = this.props;
        const { payload: { status, msg } } = await deleteSaves({propertyId: id});
        console.log(status, msg)
        if (status) {
            setAlert(msg, 'success');
        } else {
            setAlert(msg, 'error');
        }
        await getSaves();
    }

    render() {
        const { data: { img, location, entity, source, _id }, userSavelist } = this.props;

        return (
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea onClick={this.handleClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={img[0]}
                        alt="green iguana"
                    />
                    <CardContent sx={{ flexGrow: 1, padding: '16px 16px 0px 16px' }}>
                        <Typography gutterBottom variant="inherit" component="div">
                            <Typography gutterBottom variant="inherit" display='inline'>
                                {entity.type}
                            </Typography>
                            <Typography gutterBottom variant="inherit" sx={{ display: 'inline', float: 'right', backgroundColor: 'grey.300' }}>
                                {source.inNetwork ? 'In Network' : 'Out of Network'}
                            </Typography>
                        </Typography>

                        <Typography gutterBottom variant="inherit" component="div" sx={{ paddingTop: '10px' }}>
                            <Typography gutterBottom variant="inherit" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                                {location.communityName}
                            </Typography>
                            <Typography gutterBottom variant="inherit" sx={{ fontSize: '0.9rem' }}>
                                {`${location.street}, ${location.city}, ${location.state}, ${location.zipCode}`}
                            </Typography>
                        </Typography>

                        <Typography gutterBottom variant="inherit" component="div" sx={{ paddingTop: '5px' }}>
                            <Box display='inline-block'>
                                <Box sx={{ display: 'flex', paddingRight: '5px' }}>
                                    <BedOutlinedIcon size='small' sx={{ paddingRight: '3px' }} />
                                    <Typography display='inline'>{entity.beds > 1 ? `${entity.beds} beds` : `${entity.beds} bed`}</Typography>
                                </Box>
                            </Box>
                            <Box display='inline-block'>
                                <Box sx={{ display: 'flex' }}>
                                    <BathtubOutlinedIcon size='small' sx={{ paddingRight: '3px' }} />
                                    <Typography display='inline'>{entity.baths > 1 ? `${entity.baths} baths` : `${entity.baths} bath`}</Typography>
                                </Box>
                            </Box>
                        </Typography>
                    </CardContent>

                </CardActionArea>
                <CardActions>
                    <Typography gutterBottom variant="inherit" sx={{ paddingLeft: '8px' }}>
                        {`$${entity.price}/mo`}
                    </Typography>
                    <Button onClick={
                        () => {
                            if (userSavelist.find((element) => element === _id)) {
                                this.deleteFromSaveList(_id);
                            } else {
                                this.addtoSaveList(_id);
                            }
                        }
                    } size="small" sx={{ color: 'grey.500', marginLeft: '40%' }}>
                        {userSavelist.find((element) => element === _id) ? <DeleteForeverOutlinedIcon /> : <FavoriteBorderIcon />}
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    userSavelist: state.user.saves,
});

const mapDispatchToProps = (dispatch) => ({
    searchDetail: (data) => dispatch(searchDetail(data)),
    addSaves: (propertyId) => dispatch(addSaves(propertyId)),
    getSaves: () => dispatch(getSaves()),
    deleteSaves: (propertyId) => dispatch(deleteSaves(propertyId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAlert(HouseCard)));
