export const msalConfig = {
  auth: {
    clientId: "1e92c628-ae20-4bf9-ae06-27518b7a2d90",
    authority: "https://login.microsoftonline.com/incturet.onmicrosoft.com", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "https://assetmgmt.practicei.xyz",
    // redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com",
};
