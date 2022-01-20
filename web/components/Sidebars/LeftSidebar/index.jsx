import { useAuth0 } from '@auth0/auth0-react';
import Nav from './Nav';
import ChatSidebar from './Chat';
import MatcherSidebar from './Matcher/MatcherSidebar';
import { Typography } from '@mui/material';

import { Route, Routes } from 'react-router-dom';

const LeftSidebar = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div
      className="left-sidebar"
      id="resizable"
      elevation={10}
      data-testid="left-sidebar"
    >
      <Routes>
        <Route path="/roomchat" element={<ChatSidebar />} />
        <Route path="/matcher" element={<MatcherSidebar />} />
      </Routes>
      <div className="footer" data-testid="footer">
        <Nav />
        <Typography
          variant="overline"
          gutterBottom
          style={{ textAlign: 'center', marginTop: '1.4rem' }}
        >
          © Jangle 2021
        </Typography>
      </div>
    </div>
  ) : (
    <div className="left-sidebar" id="resizable" elevation={10}>
      <Typography
        variant="overline"
        gutterBottom
        className="footer"
        style={{ textAlign: 'center', marginTop: '1.4rem' }}
      >
        © Jangle 2021
      </Typography>
    </div>
  );
};

export default LeftSidebar;
