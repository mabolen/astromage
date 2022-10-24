import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NoSSRWrapper from '../src/components/noSSRWrapper/noSSRWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return <NoSSRWrapper><Component {...pageProps} /></NoSSRWrapper>
}

export default MyApp
