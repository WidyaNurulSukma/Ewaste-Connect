import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import AuthProvider from './context/AuthContext.context.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
