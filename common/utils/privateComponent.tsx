'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { routes } from '@/common/routes';

type Props = {
  children: React.ReactNode;
};

export function PrivateComponent ({ children }: Props) {
  const {
    data: session, status,
  } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push(routes.loginPath);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default PrivateComponent;
