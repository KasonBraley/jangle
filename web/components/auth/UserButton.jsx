import { useState } from 'react';
import {
  Box,
  Tooltip,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';

import { Logout } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router'

function UserButton() {
  const router = useRouter()
  const { logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <Button
            data-testid="profile-btn"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            id="profileBtn"
            variant="contained"
            color="primary"
          >
            <AccountCircleIcon sx={{ fontSize: 25 }} />
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
              left: 10,
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
        <MenuItem>Signed in as {user.nickname}</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            router.push('/profile');
          }}
        >
          <Avatar alt={user.nickname} src={user.picture} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
export default UserButton;
