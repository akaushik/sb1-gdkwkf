'use client';

import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useRouter } from 'next/navigation';
import { getSession, getUserInfo } from '@/lib/auth';
import Dashboard from '@/components/dashboard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      router.push('/login');
    } else {
      const fetchUserInfo = async () => {
        const info = await getUserInfo();
        setUserInfo(info);
      };
      fetchUserInfo();
    }
  }, [authState, router]);

  if (!authState || !authState.isAuthenticated) {
    return null;
  }

  const logout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the AI Chatbot</h1>
      {userInfo && (
        <p className="mb-4">Hello, {userInfo.name}!</p>
      )}
      <Dashboard />
      <Button onClick={logout} className="mt-4">Logout</Button>
    </div>
  );
}