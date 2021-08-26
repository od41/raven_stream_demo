
import { ChakraProvider, Box,} from '@chakra-ui/react';
import { BrowserRouter,} from 'react-router-dom';
import React from 'react';

// import fonts
import "@fontsource/archivo"
import "@fontsource/inter"

// theme customisations
import { theme } from './theme/theme';
import './App.css';

import Routes from './routes/Routes'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
