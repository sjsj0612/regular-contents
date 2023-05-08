'use client';
import React from 'react';
import RootStyleRegistry from '@/lib/RootStyleRegistry';
import RecoilProvider from '@/lib/RecoilProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <RecoilProvider locale="en-us">
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}


