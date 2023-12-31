import { ChakraProvider } from '@chakra-ui/react';
import {AppProps} from 'next/app';
import { QueryClientProvider } from 'react-query';
import SidebarDrawerProvider from '../context/SidebarDrawerContext';
import { makeServer } from '../services/mirage';
import {theme} from '../styles/theme';
import {ReactQueryDevtools} from 'react-query/devtools';
import { queryClient } from '../services/queryClient';

//process.env.NODE_ENV  - setado automaticamente pelo next
if(process.env.NODE_ENV === 'development')
{
  makeServer();
}

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default MyApp
