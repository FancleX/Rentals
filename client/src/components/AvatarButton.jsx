import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import withRouter from '../hooks/withRouter';

class AvatarButton extends Component {

  state = {
    setAnchorEl: null,
  }

  handleClick = (event) => {
    this.setState({setAnchorEl: event.currentTarget});
  }

  handleClose = () => {
    this.setState({setAnchorEl: null});
  }

  handleToggleEvent = (event) => {
    const { innerText } = event.target;
    const { navigate } = this.props.router;

    switch (innerText) {
      case 'Profile':
        navigate('/profile');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'Logout':
        // Todo: logout
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={this.handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={Boolean(this.state.anchorEl) ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(this.state.anchorEl) ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={this.state.setAnchorEl}
        id="account-menu"
        open={Boolean(this.state.setAnchorEl)}
        onClose={this.handleClose}
        onClick={this.handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={(event) => this.handleToggleEvent(event)}>
          <Avatar />Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={(event) => this.handleToggleEvent(event)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={(event) => this.handleToggleEvent(event)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
    )
  }
}

export default withRouter(AvatarButton);