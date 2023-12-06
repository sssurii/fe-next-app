'use client';
import { Button } from "@/common/components/atoms/button";
import { Typography } from "@/common/components/atoms/typography";
import { useRouter } from "next/navigation";
import React from "react";
import lang from "@/common/lang";
import { routes } from "@/common/routes";

const { dashboard: dashboardCopy } = lang;

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-10">
      <Typography variant="h4" classes="text-center font-semibold text-text-primary mb-12 text-2xl" data-cy="login-success-heading">
        {dashboardCopy.loggedIn}
      </Typography>
      <Button
        type="button"
        variant="solid"
        size="sm"
        data-cy="button-test-payment"
        onClick={() => router.push(routes.planSettingsPath)}
      >
        {dashboardCopy.payment}
      </Button>
    </div>
  );
};

export default DashboardPage;
