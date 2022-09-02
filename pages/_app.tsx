import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import store, { defaultState, getLocalStorageParsed } from '../src/redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { setVehicles, Vehicle } from '../src/redux/reducers/vehicles'
import { setSpaces, Space } from '../src/redux/reducers/spaces'
import { Checkout, setCheckouts } from '../src/redux/reducers/checkouts'
import { Rates, setRates } from '../src/redux/reducers/rates'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  /**
   * load initial state for
   * vehicle and spaces
   */

  useEffect(() => {
    store.dispatch(
      setVehicles(getLocalStorageParsed('redux', 'vehicles') as Vehicle[])
    )
    store.dispatch(
      setSpaces(getLocalStorageParsed('redux', 'spaces') as Space[])
    )
    store.dispatch(
      setCheckouts(getLocalStorageParsed('redux', 'checkouts') as Checkout[])
    )
    store.dispatch(setRates(getLocalStorageParsed('redux', 'rates') as Rates))
  }, [])

  useEffect(() => {
    setInterval(() => {
      if (process.browser && window && window.localStorage) {
        window?.localStorage?.setItem('redux', JSON.stringify(store.getState()))
      }
    }, 1000)
  }, [])
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  )
}

export default MyApp
