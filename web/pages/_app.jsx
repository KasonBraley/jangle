import "../styles/globals.css"
import "../styles/app.scss"
import Layout from "../components/Layout.jsx"
import SocketProvider from "../context/socket"
import { Provider as StoreProvider } from "react-redux"
import store from "../store"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider store={store()}>
        <SocketProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SocketProvider>
      </StoreProvider>
    </SessionProvider>
  )
}

export default MyApp
