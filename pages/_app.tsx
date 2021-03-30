import '../styles/index.scss'
import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from "react-redux"
import { store } from '../state'
import NextNprogress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {


  return (
    <>
      <NextNprogress
        options={{
          showSpinner: false,
        }}
        color="#1e97c7"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <ReduxProvider store={store}>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </ReduxProvider>
    </>
  )
}

export default MyApp



