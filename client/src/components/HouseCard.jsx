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

export default class HouseCard extends Component {
    render() {
        return (
            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                        alt="green iguana"
                    />
                    <CardContent sx={{ flexGrow: 1, padding: '16px 16px 0px 16px' }}>
                        <Typography gutterBottom variant="inherit" component="div">
                            <Typography gutterBottom variant="inherit" display='inline'>
                                House Type
                            </Typography>
                            <Typography gutterBottom variant="inherit" sx={{ display: 'inline', float: 'right', backgroundColor: 'grey.300' }}>
                                Source
                            </Typography>
                        </Typography>

                        <Typography gutterBottom variant="inherit" component="div" sx={{ paddingTop: '10px' }}>
                            <Typography gutterBottom variant="inherit" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                                Street
                            </Typography>
                            <Typography gutterBottom variant="inherit" sx={{ fontSize: '0.9rem' }}>
                                city, state, zipCode
                            </Typography>
                        </Typography>

                        <Typography gutterBottom variant="inherit" component="div" sx={{ paddingTop: '5px' }}>
                            <Box display='inline-block'>
                                <Box sx={{ display: 'flex', paddingRight: '5px' }}>
                                    <BedOutlinedIcon size='small' sx={{paddingRight: '3px'}} />
                                    <Typography display='inline'>3 beds</Typography>
                                </Box>
                            </Box>
                            <Box display='inline-block'>
                                <Box sx={{ display: 'flex' }}>
                                    <BathtubOutlinedIcon size='small' sx={{paddingRight: '3px'}} />
                                    <Typography display='inline'>3 baths</Typography>
                                </Box>
                            </Box>
                        </Typography>
                    </CardContent>

                </CardActionArea>
                <CardActions>
                    <Typography gutterBottom variant="inherit" sx={{paddingLeft: '8px'}}>
                        price
                    </Typography>
                    <Button size="small" sx={{ color: 'grey.500' }}>
                        <FavoriteBorderIcon />
                    </Button>
                </CardActions>
            </Card>
        )
    }
}
