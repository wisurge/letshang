'use client';

import { RecoilRoot } from 'recoil';
import './globals.css';
import BackgroundSync from '@/features/event/components/BackgroundSync';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <BackgroundSync />
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}

