import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AvatarButton from './AvatarButton';
import SignInButton from './SignInButton';
import HideOnScroll from './HideOnScroll';
import { connect } from 'react-redux';
import withRouter from '../hooks/withRouter';
import './NavBar.css';

class NavBar extends Component {

    pages = ['Rent', 'Post']

    pageInfo = { name: "Rentals.com" }

    state = {
        anchorElNav: null,
    }

    // auth state from redux
    isAuth = true

    handleOpenNavMenu = (event) => {
        this.setState({ anchorElNav: event.currentTarget });
    }

    handleCloseNavMenu = () => {
        this.setState({ anchorElNav: null });
    }

    handleNavClick = (event) => {
        const btnName = event.currentTarget.innerText;
        const { navigate } = this.props.router;

        if (btnName === 'RENT') {
            console.log(this.props)
            // give top search 100 
            navigate('/rent/search?location=all');
        } else {
            navigate('/post');
        }
    }

    render() {
        return (
            <HideOnScroll {...this.props}>
                <AppBar className='appBar'>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <ApartmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                href='/'
                                component='a'
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {this.pageInfo.name}
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(this.state.anchorElNav)}
                                    onClose={this.handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {this.pages.map((page) => (
                                        <MenuItem key={page} onClick={this.handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {this.pageInfo.name}
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {this.pages.map((page) => (
                                    <Button
                                        key={page}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                        onClick={this.handleNavClick}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                {this.isAuth ? <AvatarButton /> : <SignInButton />}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        )
    }
}

// mapStateToProps = (state) => {
//     return ({

//     })
// }

// mapDispatchToProps = (dispatch) => {
//     return ({

//     })
// }

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)


export default withRouter(NavBar);
