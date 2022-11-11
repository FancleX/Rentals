import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default class AvatarButton extends Component {

  settings = ['Profile', 'Account', 'Dashboard', 'Logout']

  state = {
    anchorElUser: null,
    setAnchorElUser: null
  }

  handleOpenNavMenu = (event) => {
    // setAnchorElNav(event.currentTarget);
  }

  handleOpenUserMenu = (event) => {
      // setAnchorElUser(event.currentTarget);
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}
