import { useState } from 'react';
import { IconButton, Box, Menu } from '@mui/material';
import CreateRoomForm from './CreateRoomForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7289da',
    },
  },
});

const CreateRoom = () => {
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
        <ThemeProvider theme={theme}>
          <Tooltip title="Create Room">
            <IconButton onClick={handleClick} size="small" id="createRoomBtn">
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </ThemeProvider>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#474b52',
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
              right: 12,
              width: 10,
              height: 10,
              bgcolor: '#474b52',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <CreateRoomForm handleClose={handleClose} />
      </Menu>
    </>
  );
};

export default CreateRoom;
