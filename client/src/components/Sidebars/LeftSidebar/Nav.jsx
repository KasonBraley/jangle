import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7db1b1',
    },
  },
});

const Nav = () => {
  return (
    <div id="leftSidebar">
      <ThemeProvider theme={theme}>
        <div className="navRow">
          <Button
            data-testid="roomchat-left-btn"
            size="small"
            component={Link}
            to={`/roomchat`}
            variant="outlined"
            color="primary"
            className="navBtn"
          >
            Chat <ChatOutlinedIcon className="navIcon" />
          </Button>
        </div>
        <div className="navRow">
          <Button
            data-testid="matcher-left-btn"
            size="small"
            component={Link}
            to={`/matcher`}
            variant="outlined"
            color="primary"
            className="navBtn"
          >
            Match <SentimentVerySatisfiedIcon className="navIcon" />
          </Button>
        </div>
        <div className="navRow">
          <Button
            data-testid="profile-left-btn"
            size="small"
            component={Link}
            to={`/profile`}
            variant="outlined"
            color="primary"
            className="navBtn"
          >
            Profile <AccountCircleIcon className="navIcon" />
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Nav;
