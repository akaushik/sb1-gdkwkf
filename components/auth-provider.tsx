'use client';

import { ReactNode } from 'react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useRouter } from 'next/navigation';

const oktaAuth = new OktaAuth({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{yourClientId}',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/login/callback` : '',
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    router.push(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
}