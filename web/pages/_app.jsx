import "../styles/globals.css"
import "../styles/app.scss"
import Layout from "../components/Layout.jsx"
import { Auth0Provider } from "@auth0/auth0-react"
import SocketProvider from "../context/socket"
import { Provider as StoreProvider } from "react-redux"
import store from "../store"

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={typeof window !== "undefined" ? window.location.origin : ""}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <StoreProvider store={store()}>
        <SocketProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SocketProvider>
      </StoreProvider>
    </Auth0Provider>
  )
}

export default MyApp
