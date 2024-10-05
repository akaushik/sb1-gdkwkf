'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useRouter } from 'next/navigation';
import { oktaConfig } from '@/lib/oktaConfig';

const inter = Inter({ subsets: ['latin'] });

const oktaAuth = new OktaAuth(oktaConfig);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    router.push(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <html lang="en">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <body className={inter.className}>{children}</body>
      </Security>
    </html>
  );
}