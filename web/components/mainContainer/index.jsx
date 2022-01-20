import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const MainContainer = (props) => {
  const location = useLocation();

  let feature;
  if (location.pathname === '/profile') {
    feature = '';
  } else if (location.pathname === '/roomchat') {
    feature = 'Room Chat';
  } else if (location.pathname === '/matcher') {
    feature = '';
  }

  return (
    <>
      <div
        data-testid="main-container"
        className={
          location.pathname !== '/matcher'
            ? 'main-container'
            : 'main-container-matcher'
        }
      >
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className="roomTitle"
        >
          {feature}
        </Typography>
        {props.children}
      </div>
    </>
  );
};

export default MainContainer;
