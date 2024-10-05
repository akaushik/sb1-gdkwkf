import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('okta-token-storage');
  
  if (token) {
    try {
      const { idToken } = JSON.parse(token.value);
      const decodedToken = jwtDecode(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error parsing session token:', error);
    }
  }
  return null;
}