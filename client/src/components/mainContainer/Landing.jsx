import { Button, Typography, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import friends4 from '../../img/friends4.jpg';
import friends5 from '../../img/friends5.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7289da',
    },
  },
});

const Landing = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div id="landing">
      <ThemeProvider theme={theme}>
        <h1>Welcome to Jangle.</h1>
        {isAuthenticated ? (
          <>
            <Typography className="letterSpacing" variant="h6">
              Let&apos;s get started! What would you like to do?
            </Typography>
            <Link to="/profile">
              <Button
                data-testid="profile-btn"
                className="landBtn"
                size="small"
                variant="contained"
                color="primary"
                endIcon={<AccountCircleIcon />}
              >
                Update Profile
              </Button>
            </Link>
            <Link to="/roomchat">
              <Button
                data-testid="roomchat-btn"
                className="landBtn"
                size="small"
                variant="contained"
                color="primary"
                endIcon={<ChatOutlinedIcon />}
              >
                Start Chatting
              </Button>
            </Link>
            <Link to="/matcher">
              <Button
                data-testid="matcher-btn"
                className="landBtn"
                size="small"
                variant="contained"
                color="primary"
                endIcon={<SentimentVerySatisfiedIcon />}
              >
                Find Matches
              </Button>
            </Link>
            <CardMedia
              className="friendsImg"
              src={friends4}
              component="img"
              alt="social image"
            />
          </>
        ) : (
          <>
            <Typography className="letterSpacing" variant="h6">
              A place where you can find your community and connect with others.
            </Typography>
            <CardMedia
              className="friendsImg"
              src={friends5}
              component="img"
              alt="social image"
            />
            <Typography className="letterSpacing">
              Please <a onClick={loginWithRedirect}>sign in</a> or{' '}
              <a onClick={loginWithRedirect}>register</a> to continue.
            </Typography>
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Landing;
