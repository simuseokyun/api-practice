import './globals.css';
import Provider from './components/queryClient';
import { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
