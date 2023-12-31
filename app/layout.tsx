import './globals.css';
import { Inter } from 'next/font/google';
import ToasterContext from '@/app/context/ToasterContext';
import AuthContext from '@/app/context/AuthContext';
import ActiveStatus from '@/app/components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone using NextJS 13, Tailwind, Typescript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
