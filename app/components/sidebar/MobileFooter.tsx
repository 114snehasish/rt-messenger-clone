'use client';
import useRoutes from '@/app/hooks/useRoutes';
import useConversation from '@/app/hooks/useConversation';
import { MobileItem } from '@/app/components/sidebar/MobileItem';

export const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) return null;
  return (
    <div
      className='
      fixed
      justify-between
      w-full
      bottom-0
      z-40
      flex
      items-center
      bg-white
      border-t-[1px]
      lg:hidden
    '
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};
