import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import './App.scss';
import Profile from './components/mainContainer/Profile';
import Roomchat from './components/mainContainer/roomchat';
import Matcher from './components/mainContainer/Matcher';
import Landing from './components/mainContainer/Landing';
import Layout from './components/Layout';

function App() {
  let { isAuthenticated } = useAuth0();

  function RequireAuth({ children, redirectTo }) {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route
              path="profile"
              element={
                <RequireAuth redirectTo="/">
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="roomchat"
              element={
                <RequireAuth redirectTo="/">
                  <Roomchat />
                </RequireAuth>
              }
            />
            <Route
              path="matcher"
              element={
                <RequireAuth redirectTo="/">
                  <Matcher />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
