import * as React from 'react'
import { useIsAuthenticated } from '@azure/msal-react';
import App from './App';
import LoginPage from './Pages/LoginPage/LoginPage';


function Secured() {
  const isAuthenticated = useIsAuthenticated();




  return (
    <>
      {
        isAuthenticated ? <App /> : <LoginPage />
      }
    </>
  );
}

export default Secured;
