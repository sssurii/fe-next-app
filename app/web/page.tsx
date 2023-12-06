'use client';
import React from 'react';
import lang from '@/common/lang';
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/atoms";
import { BoltOrangeImage } from "@/common/components/icons";
import { Logo } from "@/common/components/icons";
import { useSession } from "next-auth/react";
import { useLogout } from "@/common/utils/hooks";
import { routes } from "@/common/routes";

const { home: homeCopy } = lang;

const WebPage = () => {
  const router = useRouter();
  const session = useSession();
  const { handleLogout } = useLogout();
  const isAuthenticated = session?.status === 'authenticated';

  return (
    <section>
      <header>
        <div className="flex flex-wrap row-auto items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-5 mt-10">
          <Logo width={160} height={80} />
          <h1 data-cy="fnl-header" className="text-3xl font-bold leading-tight tracking-tight text-text-primary">
            {homeCopy.title}
          </h1>
        </div>
      </header>
      <div className="flex items-center space-x-3 justify-center mt-10">
        {isAuthenticated ? (
          <>
            <Button variant="solid" size="sm" data-cy="button-sign-up" onClick={() => router.push(routes.dashboardPath)}>
              {homeCopy.dashboard}
            </Button>
            <Button variant="solid" size="sm" data-cy="button-test-payment" onClick={() => router.push(routes.planSettingsPath)}>
              {homeCopy.payment}
            </Button>
            <Button variant="solid" size="sm" data-cy="button-sign-in" onClick={handleLogout}>
              {homeCopy.logout}
            </Button>
          </>
        ) : (
          <>
            <Button variant="solid" size="sm" data-cy="button-sign-up" onClick={() => router.push(routes.signupPath)}>
              {homeCopy.signUp}
            </Button>
            <Button variant="solid" size="sm" data-cy="button-sign-in" onClick={() => router.push(routes.loginPath)}>
              {homeCopy.login}
            </Button>
          </>
        )}
      </div>
      <div className="flex row w-screen overflow-hidden mt-10">
        <BoltOrangeImage className="h-60" />
        <BoltOrangeImage className="h-60" />
        <BoltOrangeImage className="h-60" />
        <BoltOrangeImage className="h-60" />
        <BoltOrangeImage className="h-60" />
        <BoltOrangeImage className="h-60" />
      </div>
    </section>
  );
};

export default WebPage;
