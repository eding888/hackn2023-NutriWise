import React from 'react'
import ReactDOM from 'react-dom/client'
import PageRouting from './PageRouting.tsx';
import App from './Landing.tsx'
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <PageRouting />
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>

)
