import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/store'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import { PersistGate } from 'redux-persist/integration/react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { pageTransition } from '../animation/animations'

function MyApp({ Component, pageProps, router }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LayoutGroup>
            <AnimatePresence mode='wait'>
              <motion.div key={router.route} initial='initial' animate='animate' exit='exit' variants={pageTransition}>
                <Toaster />
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
