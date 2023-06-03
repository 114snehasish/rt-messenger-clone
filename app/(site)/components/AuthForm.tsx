'use client';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'login' | 'register';

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('login');
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === 'login') {
      setVariant('register');
    } else {
      setVariant('login');
    }
  }, [variant]);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === 'register') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .catch(() => {
          toast.error('Something went wrong, please try again ater');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === 'login') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) toast.error('Invalid Credentials');
          if (callback?.ok && !callback?.error) {
            toast.success('Logged In');
            router.push('/users');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error)
          toast.error('Something went wrong, please try again later');
        if (callback?.ok && !callback?.error) toast.success('Logged In');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'register' && (
            <Input
              id='name'
              label='Name'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id='email'
            label='Email Address'
            type='email'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id='password'
            label='Password'
            type='password'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button disabled={isLoading} type='submit' fullWidth>
            {variant === 'register' ? 'Register' : 'Sign In'}
          </Button>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className={`
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
        `}
        >
          <div>
            {variant === 'login'
              ? 'Don’t have an account? '
              : 'Already have an account? '}
          </div>
          <div
            className='cursor-pointer underline hover:text-gray-900'
            onClick={toggleVariant}
          >
            {variant === 'login' ? 'Register' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}
