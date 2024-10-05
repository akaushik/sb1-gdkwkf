import { jwtDecode } from 'jwt-decode';
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaConfig } from './oktaConfig';

const oktaAuth = new OktaAuth(oktaConfig);

export async function getSession() {
  try {
    const accessToken = await oktaAuth.getAccessToken();
    if (!accessToken) {
      console.log('No access token available');
      return null;
    }

    const decodedToken = jwtDecode(accessToken);
    return {
      user: {
        name: decodedToken.name,
        email: decodedToken.email,
      },
      expires: new Date(decodedToken.exp * 1000).toISOString(),
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getUserInfo() {
  try {
    const userInfo = await oktaAuth.getUser();
    return userInfo;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}