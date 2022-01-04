import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import App from './App';
import SocketProvider from './context/socket';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';
import './index.css';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <StoreProvider store={store()}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
