'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOktaAuth } from '@okta/okta-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const { oktaAuth, authState } = useOktaAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      router.push('/');
    }
  }, [authState, router]);

  const login = async () => {
    try {
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again later.');
    }
  };

  if (authState?.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button onClick={login} className="w-full">Log in with Okta</Button>
      </div>
    </div>
  );
}