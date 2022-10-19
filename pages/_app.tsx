import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/store'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import { PersistGate } from 'redux-persist/integration/react'


function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      
          <Toaster />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
