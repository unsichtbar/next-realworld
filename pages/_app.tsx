import { ReactQueryCacheProvider, queryCache } from 'react-query'
import Layout from '../components/layout'
import { AuthenticationProvider } from '../lib/auth/Authentication'
import { ThemeProvider } from '../components/theme'
import { HttpClientProvider } from '../lib/http/HttpClient'
export default function App({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <HttpClientProvider>
        <AuthenticationProvider>
          <ThemeProvider><Layout>
            <Component {...pageProps} />
          </Layout>
          </ThemeProvider>
        </AuthenticationProvider>
      </HttpClientProvider>
    </ReactQueryCacheProvider>)
}
