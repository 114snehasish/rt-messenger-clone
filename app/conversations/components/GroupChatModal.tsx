'use client';

import React, { useState } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal } from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import { Select } from '@/app/components/inputs/Select';
import Button from '@/app/components/Button';

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

export const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });
  const members = watch('members');
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/conversations', { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((errors) => {
        console.error(errors);
        toast.error('Something went wrong!!');
      })
      .finally(() => setIsLoading(false));
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create a Group Chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Crate a chat with more than 2 people.
            </p>
            <div
              className='
              mt-10
              flex
              flex-col
              gap-y-8
            '
            >
              <Input
                label='Name'
                id='name'
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <Select
                disabled={isLoading}
                label='Members'
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div
          className='
          mt-6
          flex
          items-center
          justify-end
          gap-x-6
        '
        >
          <Button
            disabled={isLoading}
            onClick={onClose}
            type='button'
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type='submit'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
