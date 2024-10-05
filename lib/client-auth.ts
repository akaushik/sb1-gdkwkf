import { jwtDecode } from 'jwt-decode';

export async function getClientSession() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('okta-token-storage');
    
    if (token) {
      try {
        const { idToken } = JSON.parse(token);
        const decodedToken = jwtDecode(idToken);
        return decodedToken;
      } catch (error) {
        console.error('Error parsing client session token:', error);
      }
    }
  }
  return null;
}