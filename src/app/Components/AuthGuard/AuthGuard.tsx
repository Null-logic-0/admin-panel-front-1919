'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authState } from '@/app/helpers/authState';
import { ReactNode, useEffect } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthGuard;
