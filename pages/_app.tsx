import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material'; 
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
};