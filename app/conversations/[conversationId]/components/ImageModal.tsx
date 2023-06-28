'use client';

import React from 'react';
import { sr } from 'date-fns/locale';
import { Modal } from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  src,
  isOpen,
  onClose,
}) => {
  if (!src) return null;
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='w-80 h-80'>
        <Image src={src} alt='Image' className='object-cover' fill />
      </div>
    </Modal>
  );
};
