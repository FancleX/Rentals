import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { connect } from 'react-redux';
import './NavBar.css';

class NavBar extends Component {
    
    pages = ['Products', 'Pricing', 'Blog'];
    
    settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    
    pageInfo = { name: "Rentals.com" };

    state = {
        anchorElNav: null,
        setAnchorElNav: null,
        anchorElUser: null,
        setAnchorElUser: null
    };

    handleOpenNavMenu = (event) => {
        // setAnchorElNav(event.currentTarget);
    }

    handleOpenUserMenu = (event) => {
        // setAnchorElUser(event.currentTarget);
    }

    handleCloseNavMenu = () => {
        // setAnchorElNav(null);
    }

    handleCloseUserMenu = () => {
        // setAnchorElUser(null);
    }

  render() {
    return (
        <AppBar className='appBar' position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <ApartmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
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
                        onClick={this.handleCloseNavMenu}
                        sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Avatar" src={this.state.anchorElUser} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={this.state.anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(this.state.anchorElUser)}
                    onClose={this.handleCloseUserMenu}
                    >
                    {this.settings.map((setting) => (
                        <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
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

export default NavBar;
