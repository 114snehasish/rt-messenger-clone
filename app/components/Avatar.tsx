'use client';

import { User } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import useActiveList from '@/app/hooks/useActiveList';

interface AvatarProps {
  image?: string;
  user?: User;
  statusInvisible?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  image,
  user,
  statusInvisible,
}) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className='relative'>
      <div
        className='
    relative
    inline-block
    rounded-full
    overflow-hidden
    h-9
    w-9
    md:h-11
    md:w-11
  '
      >
        <Image
          src={image || user?.image || '/images/placeholder.jpg'}
          alt='Avatar'
          fill
        />
      </div>
      {isActive && (
        <span
          className={clsx(
            `
         absolute
         block
         rounded-full
         bg-green-500
         ring-2
         ring-white
         top-0
         right-0
         h-2
         w-2
         md:h-3
         md:w-3
       `,
            statusInvisible ? 'hidden' : 'block'
          )}
        />
      )}
    </div>
  );
};
