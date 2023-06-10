import React from 'react';
import { DesktopSidebar } from '@/app/components/sidebar/DesktopSidebar';
import { MobileFooter } from '@/app/components/sidebar/MobileFooter';

export const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <DesktopSidebar />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
};