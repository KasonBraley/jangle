import { useContext } from 'react';
import { Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { SocketContext } from '../../../context/socket';

const CurrentRoom = () => {
  const { currentRoom } = useContext(SocketContext);

  if (currentRoom) {
    return (
      <div>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          Now talking in: {currentRoom}
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <Typography
        className="letterSpacing"
        variant="h6"
        data-testid="current-room"
      >
        <ArrowBackRoundedIcon id="leftArrow" className="bounce" />
        Please select a Room.
      </Typography>
    </div>
  );
};

export default CurrentRoom;
