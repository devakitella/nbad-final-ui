// TokenExpirationCheck.js

import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const RefreshToken = (WrappedComponent) => {
  const TokenExpirationCheckWrapper = (props) => {
    useEffect(() => {
      const checkTokenExpiration = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
          return;
        }

        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        const alertTime = 20 * 1000;

        const timeoutId = setTimeout(async () => {
          const userChoice = window.confirm('Your session is about to expire. Do you want to refresh your session?');

          if (userChoice) {
            try {
              const response = await axios.post('http://192.81.209.146:4005/api/refreshAccessToken', {
                refreshToken: localStorage.getItem('token'),
              });

              console.log(response)
              const newToken = response.data.accessToken;
              localStorage.removeItem('token');
              localStorage.setItem('token', newToken);

              window.location.reload();
            } catch (error) {
              console.error('Error refreshing token:', error);
              localStorage.removeItem('token');
              window.location.href = 'http://167.99.158.75/signin';
            }
          } else {
            localStorage.removeItem('token');
            window.location.href = 'http://167.99.158.75/signin';
          }
        }, timeUntilExpiration - alertTime);

        // Clear the timeout when the component unmounts or the effect is re-triggered
        return () => clearTimeout(timeoutId);
      };

      checkTokenExpiration();
    }, []); // Empty dependency array ensures that the effect runs only once

    return <WrappedComponent {...props} />;
  };

  return TokenExpirationCheckWrapper;
};

export default RefreshToken;