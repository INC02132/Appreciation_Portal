import * as React from 'react'
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';
import App from './App';
import Login from './Pages/Login';


function Secured() {
  const isAuthenticated = useIsAuthenticated();


  const { accounts } = useMsal();


  return (
    <>
      {
        isAuthenticated ? <App /> : <Login />
      }
    </>
  );
}

export default Secured;
