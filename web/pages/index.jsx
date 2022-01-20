import { useAuth0 } from '@auth0/auth0-react';

import Landing from '../components/mainContainer/Landing';

function App() {
  let { isAuthenticated } = useAuth0();

  function RequireAuth({ children, redirectTo }) {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
