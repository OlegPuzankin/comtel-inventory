import '../styles/index.scss'
import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from "react-redux"
import { store } from '../state'


function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <ReduxProvider store={store}>
      <Provider session={session}>
        <Component {...pageProps} />
      </Provider>
    </ReduxProvider>
  )
}

export default MyApp



